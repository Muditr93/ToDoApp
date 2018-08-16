/**
 *
 * ListsPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectListsPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const options = [
  'None',
  'Atria',
  'Callisto',

];
const ITEM_HEIGHT = 48;
/* eslint-disable react/prefer-stateless-function */
export class ListsPage extends React.Component {
  state = {
        anchorEl: null,
        open: false,
        tasks: [
            {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id"); // gets the id of the droped item

       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }
    handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

    render() {
        var tasks = {
            wip: [],
            inprogress: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style={{ background: '#fafafa80' , textAlign: 'left', paddingLeft:'10px' }}
                >
                    {t.name}
                    <IconMenu
                      style={{float: 'right'}}
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Help" />
                      <MenuItem primaryText="Sign out" />
                    </IconMenu>
                </div>
            );
        });

        return (
          <MuiThemeProvider>
            <div className="container-drag">
                <h2 className="header">Tasks</h2>
                <div style={{display: 'flex'}}>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>{this.onDrop(e, "wip")}}>
                      <span className="task-header">WIP</span>
                      {tasks.wip}
                  </div>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>this.onDrop(e, "inprogress")}>
                       <span className="task-header">IN PROGRESS</span>
                       {tasks.inprogress}
                  </div>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>this.onDrop(e, "complete")}>
                       <span className="task-header">COMPLETED</span>
                       {tasks.complete}
                  </div>
                </div>
            </div>
          </MuiThemeProvider>
        );
    }
}

ListsPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  listspage: makeSelectListsPage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "listsPage", reducer });
const withSaga = injectSaga({ key: "listsPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ListsPage);
