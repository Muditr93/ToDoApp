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
            errTxt: null,
            index: null,
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
      this.setState({mopen: false, index: null, fields:{
        title:'',
        message:'',
      }});
    };
    onDragStart = (ev, id) => {
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
        errTxt: null,
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
    this.setState({ anchorEl: null, index: null, fields:{
      title:'',
      message:'',
    }, });
  };
  handleFormSubmit = () => {
    const { fields, tasks, index } = this.state;
    if (!fields.title || !fields.message) {
      this.setState({
        errTxt: 'ALl fields mandatory'
      })
    } else {
      if (index===0||index>0) {
        tasks[index] = fields;
        this.setState({
          ...this.state,
          fields:{
            title:'',
            message:'',
          },
          mopen: false,
          index: null,
          tasks: tasks
        })
      } else {
        tasks.push({
          ...fields,
          category: "wip",
        })
        this.setState({
          ...this.state,
          fields:{
            title:'',
            message:'',
          },
          mopen: false,
          tasks: tasks,
          index: null,
        })
      }
    }
    return indexDB.setItem('tasks', tasks)
  }
  handleStatusChange = (title, cat) => {
    const { fields, tasks } = this.state;
    const i =  tasks.map(tasks => tasks.title).indexOf(title)
    tasks[i].category = cat
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
      index: i,
    })
    return indexDB.setItem('tasks', tasks)
  }
  handleEdit = (i, event) => {
    event.preventDefault();
    const { tasks } = this.state;
    const clone = {...tasks[i]}
    this.setState({
      fields: clone,
      index: i,
      mopen: true,
    })
  }
    render() {
        const task_array = {
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
        this.state.tasks.forEach ((t, index) => {
            task_array[t.category].push(
                <div key={t.title}
                    onDragStart = {(e) => this.onDragStart(e, t.title)}
                    draggable
                    className="draggable"
                    style={{ background: '#fafafa80' , textAlign: 'left', paddingLeft:'10px', position: 'relative' }}
                >
                    <h4 style={{color: 'black'}}>{t.title}</h4>
                    <span style={{color: '#8a8a8a', fontSize: '12px'}} >{t.message}</span>
                    <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
                      <svg onClick={(event) => this.handleEdit(index, event)} className="Pencil"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                      <IconMenu
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
                </div>
            );
        });

        return (
          <MuiThemeProvider>
            <div className="container-drag">
                <br />
                <div style={{display: 'flex'}}>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>{this.onDrop(e, "wip")}}>
                      <span className="task-header">TO DO</span>
                      {task_array.wip}
                  </div>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>this.onDrop(e, "inprogress")}>
                       <span className="task-header">IN PROGRESS</span>
                       {task_array.inprogress}
                  </div>
                  <div className="droppable"
                      style={{flex: 1}}
                      onDragOver={(e)=>this.onDragOver(e)}
                      onDrop={(e)=>this.onDrop(e, "complete")}>
                       <span className="task-header">COMPLETED</span>
                       {task_array.complete}
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
                value={this.state.fields.title}
                onChange={(event, newValue) => this.handleChange(newValue, 'title')}
                /><br /> <br />
              <TextField
                hintText="Enter Description"
                value={this.state.fields.message}
                onChange={(event, newValue) => this.handleChange(newValue, 'message')}
              /><br />
              <div>
                <span style={{color: 'red'}}> {this.state.errTxt||(<br />)} </span>
              </div>
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
