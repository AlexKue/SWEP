import React from 'react';

import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import UserList from './UserList/UserList.jsx';

import API from './API/API.jsx';

export default class App extends React.Component {

  constructor() {
    super();
    
    this.login = this.login.bind(this);
    this.getlist = this.getlist.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {API.loginUser("testmail@example.com", "test123")}
  logout() {API.logoutUser()}
  getlist() {API.getUserList()}

  render() {

    return (
      <React.Fragment>
        <button onClick={this.login}>Login</button>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.getlist}>Getlist</button>
      </React.Fragment>
    );
  }
};
