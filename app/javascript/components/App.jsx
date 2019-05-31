import React from "react";
import { Route } from "react-router-dom";

import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import UserList from './UserList/UserList.jsx';
import TestComponent from './TestComponent.jsx';

import API from './API/API.jsx';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Route path="/(login|)" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/test" component={Test} />
      </React.Fragment>
    );
  }
};
