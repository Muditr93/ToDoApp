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
import indexDB from 'localforage';

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectListsPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

const options = [
  'None',
  'Atria',
  'Callisto',

];
const ITEM_HEIGHT = 48;
/* eslint-disable react/prefer-stateless-function */
export class ListsPage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
            fopen: false,
            mopen: false,
            fields:{
              title:'',
              message:'',
            },
            anchorEl: null,
            open: false,
            tasks: [
                {title:"Morning", message: "Learning Can be easy", category:"wip"},
                {title:"Evening", message: "Complete homework", category:"wip"},
                {title:"Night", message: "Brush your teeth", category:"complete"}
              ]
        }
    }
    componentDidMount(){
      this.checkforTasks()
    }
    async checkforTasks(){
      let tasks = await indexDB.getItem('tasks', (value) => value);
      tasks.length ? this.setState({
        tasks: tasks
      }) : null
    }
    handleOpenModal = () => {
      this.setState({mopen: true});
    };

    handleCloseModal = () => {
      this.setState({mopen: false});
    };
    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
    handleChange = (value, field) => {
      const { fields } = this.state;
      const newFields = fields;
      newFields[field] = value;
      this.setState({
        ...this.state,
        fields: newFields
      })
    }
    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id"); // gets the id of the droped item

       let tasks = this.state.tasks.filter((task) => {
           if (task.title == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
       return indexDB.setItem('tasks', tasks)
    }
    handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleFormSubmit = () => {
    const { fields, tasks } = this.state;
    tasks.push({
      ...fields,
      category: "wip",
    })
    this.setState({
      ...this.state,
      mopen: false,
      tasks: tasks
    })
    return indexDB.setItem('tasks', tasks)
  }
  handleStatusChange = (title, cat) => {
    console.log(cat);
    const { fields, tasks } = this.state;
    const i =  tasks.map(tasks => tasks.title).indexOf(title)
    tasks[i].category = cat
    console.log(tasks);
    this.setState({
      ...this.state,
      tasks: tasks,
    })
    return indexDB.setItem('tasks', tasks)
  }
  handleRemove = (title) => {
    const { fields, tasks } = this.state;
    const i =  tasks.map(tasks => tasks.title).indexOf(title)
    tasks.splice(i, 1);
    this.setState({
      ...this.state,
      tasks: tasks,
    })
    return indexDB.setItem('tasks', tasks)
  }
    render() {
        var tasks = {
            wip: [],
            inprogress: [],
            complete: []
        }
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleCloseModal}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleFormSubmit}
          />,
        ];
        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.title}
                    onDragStart = {(e) => this.onDragStart(e, t.title)}
                    draggable
                    className="draggable"
                    style={{ background: '#fafafa80' , textAlign: 'left', paddingLeft:'10px', position: 'relative' }}
                >
                    <h4>{t.title}</h4>
                    <span>{t.message}</span>
                    <IconMenu
                      style={{ position: 'absolute', top: '-10px', right: '-10px' }}
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Remove from List" onClick={() => this.handleRemove(t.title)} />
                      {t.category == 'wip'?null:(<MenuItem primaryText="Move to Pending" onClick={() => this.handleStatusChange(t.title,'wip')} />)}
                      {t.category == 'inprogress'?null:(<MenuItem primaryText="Move to In Progress" onClick={() => this.handleStatusChange(t.title,'inprogress')} />)}
                      {t.category == 'complete'?null:(<MenuItem primaryText="Move to Complete" onClick={() => this.handleStatusChange(t.title,'complete')} />)}
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
                      <span className="task-header">Pending</span>
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
            <Dialog
              title="Add to the list"
              actions={actions}
              modal
              open={this.state.mopen}
              onRequestClose={this.handleCloseModal}
            >
              <TextField
                hintText="Enter Heading"
                errorText="This field is required"
                value={this.state.fields.title}
                onChange={(event, newValue) => this.handleChange(newValue, 'title')}
                /><br />
              <TextField
                hintText="Enter Description"
                value={this.state.fields.message}
                errorText="The error text can be as long as you want, it will wrap."
                onChange={(event, newValue) => this.handleChange(newValue, 'message')}
              /><br />
            </Dialog>
            <FloatingActionButton style={{position: 'absolute', bottom: '20px', right: '20px'}} backgroundColor="#504fd3" onClick={this.handleOpenModal}>
              <ContentAdd />
            </FloatingActionButton>
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
