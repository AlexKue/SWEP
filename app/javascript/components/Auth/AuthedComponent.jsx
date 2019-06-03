import React from "react";
import { withRouter } from "react-router-dom";

import MenuBar from './MenuComponent/MenuBar.jsx';

class AuthedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "Matthias"  //TODO: Receive userNick from Server / show E-Mail
    };
  }

  render() {
    return (
      <MenuBar setUserLoggedOut={ this.props.setUserLoggedOut } />
    );
  }
}

export default withRouter(AuthedComponent);
