import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Grid,
  Button,
  Menu,
  Container
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
        <Menu id="menubar" stackable> 
          <Container>
            <Menu.Item as={Link} to="/">Home</Menu.Item>
            { /* There need to be menu generators here, based on the
              data we fetch from our server*/ }
            <Menu.Menu position="right">
              <Menu.Item onClick={ this.logoutUser } id="logoutbutton">Logout</Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        { /* Here comes the main view stuff */}
      </React.Fragment>
    );
  }
}

export default withRouter(MenuBar);
