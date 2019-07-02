import React from "react";
import { Route, withRouter } from "react-router-dom";

import LoginHOC from './Unauth/Login/LoginHOC.jsx';
import RegisterHOC from './Unauth/Register/RegisterHOC.jsx';
import TestComponent from './TestComponent.jsx';
import { FormWrapperContextProvider } from './Unauth/FormWrapper/FormWrapperContext.jsx';
import { AuthedWrapper } from './Auth/AuthedComponent.jsx';
import { AuthedContextProvider } from './Auth/AuthedContext.jsx';
import { __404 } from './Auth/Components/errors.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);

    if (!window._isLoggedIn) {
      localStorage.clear();
    }

    this.state = {
      isLoggedIn: window._isLoggedIn,
      userName: localStorage.getItem("userName"),
      userMail: localStorage.getItem("userMail"),
      userId: localStorage.getItem("userId"),
      show404: false
    }

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setUserLoggedOut = this.setUserLoggedOut.bind(this);

    let location = this.props.location.pathname;
    if (location != "/" && location != "/login" && location != "/register" && location != "/test") {
      this.state.show404 = true;
    }
  }

  setUserLoggedIn(loggedInState, userRole, userName, userMail, userId, hideInRanking) {
    window._isLoggedIn = loggedInState;
    window._userRole = userRole;
    localStorage.setItem("userName", userName);
    localStorage.setItem("userMail", userMail);
    localStorage.setItem("userId", userId);
    localStorage.setItem("hideInRanking", hideInRanking);
    this.setState({
      isLoggedIn: loggedInState
    });
  }
  setUserLoggedOut() {
    window._isLoggedIn = false;
    localStorage.clear();
    this.setState({
      isLoggedIn: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoggedIn != prevState.isLoggedIn) {
      this.setState({
        show404: false
      });
      this.props.history.push("/");
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <AuthedContextProvider setUserLoggedOut={ this.setUserLoggedOut }>
          <AuthedWrapper setUserLoggedOut={ this.setUserLoggedOut }/>
        </AuthedContextProvider>
      );
    } else {
      if (this.state.show404) { // Switch doesn't work due to FormWrapperContextProvider
        return <__404 />
      }
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
