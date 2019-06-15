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
      isLoggedIn: window._isLoggedIn
    }

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setUserLoggedOut = this.setUserLoggedOut.bind(this);
  }

  setUserLoggedIn(loggedInState, userRole) {
    window._isLoggedIn = loggedInState;
    window._userRole = userRole;
    this.setState({
      isLoggedIn: loggedInState
    });
  }
  setUserLoggedOut() {
    window._isLoggedIn = false;
    this.setState({
      isLoggedIn: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoggedIn != prevState.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <AuthedComponent setUserLoggedOut={ this.setUserLoggedOut }/>
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
