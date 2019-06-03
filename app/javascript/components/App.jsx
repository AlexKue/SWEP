import React from "react";
import { Route, withRouter } from "react-router-dom";

import LoginHOC from './Unauth/Login/LoginHOC.jsx';
import RegisterHOC from './Unauth/Register/RegisterHOC.jsx';
import UserList from './Auth/UserList/UserList.jsx';
import TestComponent from './TestComponent.jsx';
import { FormWrapperContextProvider } from './Unauth/FormWrapper/FormWrapperContext.jsx';
import AuthedComponent from './Auth/AuthedComponent.jsx';

import API from './API/API.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: sessionStorage.getItem("isLoggedIn") // TODO: refactor with window._isLoggedIn
    }

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setUserLoggedOut = this.setUserLoggedOut.bind(this);
  }

  setUserLoggedIn() {
    sessionStorage.setItem("isLoggedIn", true); // TODO: refactor with window._isLoggedIn
    this.setState({
      isLoggedIn: true
    });
  }
  setUserLoggedOut() {
    sessionStorage.clear(); // TODO: refactor with window._isLoggedIn
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <AuthedComponent />
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

export default withRouter(App);
