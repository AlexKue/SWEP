import React from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Button,
  Menu
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
    }).catch(error => {
      console.log("Error in LogoutUser");
    });
  }


  render() {
    return (
      <React.Fragment>
        <Menu stackable>
          { /* There need to be menu generators here, based on the
            data we fetch from our server*/}
          <Menu.Menu position="right">
            <Menu.Item onClick={ this.logoutUser }>Logout</Menu.Item>
          </Menu.Menu>
        </Menu>
        { /* Here comes the main view stuff */}
      </React.Fragment>
    );
  }
}

export default withRouter(MenuBar);
