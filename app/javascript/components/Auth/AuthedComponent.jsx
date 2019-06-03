import React from "react";
import { withRouter } from "react-router-dom"

class AuthedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "Matthias"  //TODO: Receive userNick from Server / show E-Mail
    };
  }

  render() {
    return (
      <h1>Willkommen, { this.state.userNick }!</h1>
    );
  }
}

export default withRouter(AuthedComponent);
