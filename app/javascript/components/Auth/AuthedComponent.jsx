import React from "react";
import { withRouter, Route } from "react-router-dom";

import MenuBar from './MenuComponent/MenuBar.jsx';
import ExerciseSeries from './ExerciseSeries/ExerciseSeries.jsx';
import { ExerciseSeriesContextProvider } from './ExerciseSeries/ExerciseSeriesContext.jsx';

class AuthedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "Matthias"  //TODO: Receive userNick from Server / show E-Mail
    };
  }

  render() {
    return (
      <React.Fragment>
        <MenuBar setUserLoggedOut={ this.props.setUserLoggedOut } />
        <ExerciseSeriesContextProvider>
          <Route exact path="/" component={ExerciseSeries} />
        </ExerciseSeriesContextProvider>
      </React.Fragment>
    );
  }
}

export default withRouter(AuthedComponent);
