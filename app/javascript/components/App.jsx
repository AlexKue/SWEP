import React from "react";
import { Route } from "react-router-dom";

import LoginHOC from './Unauth/Login/LoginHOC.jsx';
import RegisterHOC from './Unauth/Register/RegisterHOC.jsx';
import UserList from './Auth/UserList/UserList.jsx';
import TestComponent from './TestComponent.jsx';
import { FormWrapperContextProvider } from './Unauth/FormWrapper/FormWrapperContext.jsx';

import API from './API/API.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: sessionStorage.getItem("isLoggedIn")
    }

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setUserLoggedOut = this.setUserLoggedOut.bind(this);
  }

  setUserLoggedIn() {
    sessionStorage.setItem("isLoggedIn", true);
    this.setState({
      isLoggedIn: true
    });
  }
  setUserLoggedOut() {
    sessionStorage.clear();
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <h1>Du bist eingeloggt!</h1>
      );
    } else {
      return (
        <React.Fragment>
          <FormWrapperContextProvider>
            <Route path="/(login|)" render={() =>
                <LoginHOC setUserLoggedIn={ this.setUserLoggedIn } />
              }/>
            <Route path="/register" component={RegisterHOC} />
          </FormWrapperContextProvider>
          <Route path="/test" component={TestComponent} />
        </React.Fragment>
      );
    }
  }
}
