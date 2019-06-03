import React from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Button
} from "semantic-ui-react";

import API from "../../API/API.jsx";

class MenuBar extends React.Component {

  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    API.logoutUser()
    .then(response => {
      this.props.setUserLoggedOut();
      this.props.history.push("/login");
    }).catch(error => {
      console.log("Error in LogoutUser - Das sollte nicht sein");
    });
  }


  render() {
    return (
      <Button onClick={ this.logoutUser } >Ausloggen</Button>
    );
  }
}

export default withRouter(MenuBar);
