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

    this.state = {
      activeItem: "home"
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.handleMenuEvent = this.handleMenuEvent.bind(this);
  }

  handleMenuEvent(event, data) {
    switch (data.name) {
      case "home":
        this.props.history.push("/");
        break;
      case "logout":
        this.logoutUser();
        break;
    }
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
            <Menu.Item 
              name="home"
              onClick={ this.handleMenuEvent }
              active={ this.state.activeItem === "home" }>Home</Menu.Item>
            { /* There need to be menu generators here, based on the
              data we fetch from our server*/ }
            <Menu.Menu position="right">
              <Menu.Item 
                name="logout"
                id="logoutbutton"
                onClick={ this.handleMenuEvent }>Logout</Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        { /* Here comes the main view stuff */}
      </React.Fragment>
    );
  }
}

export default withRouter(MenuBar);
