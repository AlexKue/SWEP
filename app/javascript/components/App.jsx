import React from "react";
import { Route } from "react-router-dom";

import LoginHOC from './Login/LoginHOC.jsx';
import RegisterHOC from './Register/RegisterHOC.jsx';
import UserList from './UserList/UserList.jsx';
import TestComponent from './TestComponent.jsx';
import { FormWrapperContextProvider } from './FormWrapper/FormWrapperContext.jsx';

import API from './API/API.jsx';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <FormWrapperContextProvider>
          <Route path="/(login|)" component={LoginHOC} />
          <Route path="/register" component={RegisterHOC} />
        </FormWrapperContextProvider>
        <Route path="/test" component={TestComponent} />
      </React.Fragment>
    );
  }
};
