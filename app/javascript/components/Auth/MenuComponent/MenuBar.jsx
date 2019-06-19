import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Dropdown,
  Menu,
  Container
} from "semantic-ui-react";

import API from "../../API/API.jsx";
import AuthedContext from '../AuthedContext.jsx';
/* asdf */

const MenuBar = (props) => {
  let context = useContext(AuthedContext);

  return <MenuBarComponent context={context} {...props} />
}

class MenuBarComponent extends React.Component {

  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
    this.handleMenuEvent = this.handleMenuEvent.bind(this);

    this.state = {
      userNick: this.props.context.getUserName()
    }
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
              onClick={ this.handleMenuEvent }>Home</Menu.Item>
            <CategoriesMenuEntry />
            <Menu.Menu position="right">
              <Dropdown item simple text={"Eingeloggt als: " + this.state.userNick }>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/edit-profile">Benutzereinstellungen</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

const CategoriesMenuEntry = () => {
  
  const context = useContext(AuthedContext);

  return (
    <Dropdown item simple text="Übungsserien">
      <Dropdown.Menu>
        <CategoriesMenuEntryRender categories={ context.getCategories() }/>
      </Dropdown.Menu>
    </Dropdown>
  );
}

class CategoriesMenuEntryRender extends React.Component {
  render() {
    let categoryMenuEntries = [...this.props.categories].map(([id, category]) => {
      return (
        <Dropdown.Item key={"usm" + category.id} as={Link} to={"/category-" + category.id}>
          <i className='dropdown icon' />
          <span className='text'>{ category.title }</span>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/static">TODO: EXERCISES</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
      )
    });

    return categoryMenuEntries;
  }
}

export default withRouter(MenuBar);
