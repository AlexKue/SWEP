import React from "react";
import { withRouter } from "react-router-dom";

import MenuBar from './MenuComponent/MenuBar.jsx';
import Exercise from './ExerciseSeries/Exercise/Exercise.jsx';

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
        <Exercise 
          title="Test"
          description="Lorem Ipsum"
          query="SELECT * FROM"
          />
      </React.Fragment>
    );
  }
}

export default withRouter(AuthedComponent);
