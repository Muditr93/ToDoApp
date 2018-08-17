import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWelcomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import ListsPage from 'containers/ListsPage';
import LoginForm from 'components/LoginForm';
import { tileData } from './tileData';

import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import styled from 'styled-components'

import { submit, submitSuccess, submitFailure, logout, closeform, openform, displayError, authCheck } from './actions';
const styles = theme => ({
  root: {
    height: 'inherit',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const Wrapper = styled.div`
  width: 100%;
`
/* eslint-disable react/prefer-stateless-function */
export class WelcomePage extends React.Component {
  state = {
    anchorEl: null,
    fopen: false,
    mopen: false,
    fields:{
      title:'',
      message:'',
    },
    form: {
      name:'',
      password: '',
    },
    showPassword: false,
  };


  componentWillMount(){
    this.props.dispatch(authCheck());
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleFormOpen = () => {
    this.props.dispatch(openform());
   this.setState({
     anchorEl: null,
   });
 };
 handleLogout = () => {
   this.props.dispatch(logout());
   console.log('onClick');
 }
 handleFormClose = () => {
   this.props.dispatch(closeform());
   this.setState({ fopen: false });
 };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSubmit = () => {
    const { form: { name, password } } = this.state;
    if (name.length && password.length) {
      let natt = /^(?!.*[,.^"/])/i.test(name)
      let patt = /^(?!.*[,.^"/])/i.test(password)
      if (patt && natt) {
        this.props.dispatch(submit(this.state.form));
      } else {
        this.props.dispatch(displayError(`Special characters not allowed`));
      }
    } else{
      this.props.dispatch(displayError(`Must be one character long`));
    }
  }
  formValuesUpdate = prop => event => {
    let x = this.state.form;
    x[prop] = event.target.value;
    this.setState({ form: x });
  };
  handleFormSubmit = fields => {

  }
  render() {
    const { classes, welcomepage: { auth, userData, loading, fopen, errText } } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Task Manager
            </Typography>
              <div>
                {auth ? (<IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>): null}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>UserId - {`${userData.userId}`}</MenuItem>
                  <MenuItem onClick={this.handleClose}>First Name - {` ${userData.firstName}`}</MenuItem>
                  <MenuItem onClick={this.handleClose}>Last Name - {` ${userData.lastName}`}</MenuItem>
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
        <Wrapper>
          <ListsPage />
        </Wrapper>
        <Dialog
          open={fopen}
          onClose={this.handleFormClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <img height={45} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC5LdYFz2Y6OYw-bxqv1hc9ygOlu8MVE_VmdrLcDAahwYKPbdP' />
            Welcome to EVM!
          </DialogTitle>
          <DialogContent>
            <div>
              {<LoginForm
                password={this.state.password}
                name={this.state.name}
                handleChange = {(val) => this.formValuesUpdate(val)}
              />}
              <div style={{ marginTop: '12px' }}>
                <span style={{ color: 'red'}}>{errText}</span>
              </div>
            </div>

          </DialogContent>
          {loading ? (<LinearProgress />) : (
            <div>
              <DialogActions>
                <Button onClick={this.handleFormClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary" autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  welcomepage: makeSelectWelcomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'welcomePage', reducer });
const withSaga = injectSaga({ key: 'welcomePage', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(WelcomePage);
