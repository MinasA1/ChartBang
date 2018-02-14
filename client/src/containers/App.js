import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Main from './Main';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar'

const App = ({
  user,
  authErrorMessage,
  onLogout,
  toggleSidebar,
  location
}) => (
  <div>
    <Navbar
      user={user}
      onLogout={onLogout}
      toggleSidebar={toggleSidebar}
      location={location}
    />
    <Main />
  </div>
);


const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onLogout() { dispatch(actions.userLogout()) },
  toggleSidebar() {return dispatch(actions.toggleSidebar())}  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
