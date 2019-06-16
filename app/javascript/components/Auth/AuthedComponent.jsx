import React from "react";
import { withRouter, Route } from "react-router-dom";

import MenuBar from './MenuComponent/MenuBar.jsx';
import ExerciseSeries from './ExerciseSeries/ExerciseSeries.jsx';
import { AuthedContextProvider } from './AuthedContext.jsx';

class AuthedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "Matthias"  //TODO: Receive userNick from Server / show E-Mail
    };
  }

  render() {
    return (
      <AuthedContextProvider>
          <MenuBar setUserLoggedOut={ this.props.setUserLoggedOut } />
          <Route exact path="/" component={ExerciseSeries} />
      </AuthedContextProvider>
    );
  }
}

export default withRouter(AuthedComponent);
