import React from "react"
import API from "./API/API.jsx";

/*
  This component is just for test purposes. It will be pushed to the git but
  changes will not be documented.
*/

export default class TestComponent extends React.Component {

  constructor() {
    super();

    this.logintest = this.logintest.bind(this);
    this.logouttest = this.logouttest.bind(this);
    this.userlisttest = this.userlisttest.bind(this);
    this.registertest = this.registertest.bind(this);

    this.updateName = this.updateName.bind(this);
    this.updateMail = this.updateMail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      errorList: ""
    }
  }

  logintest() {
    API.loginUser(this.state.email, this.state.password)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  logouttest() {
    API.logoutUser()
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  userlisttest() {
    API.getUserList()
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  registertest() {
    API.registerUser(this.state.name, this.state.email, this.state.password, this.state.password)
    .then(response => {
      console.log(response);
    }).catch(error => {
      this.setState({
        errorList: <Message>error</Message> /* necessary to simulate register form*/
      });
    });
  }

  updateName(event) {
    console.log(event);
    this.setState({
      name: event.target.value
    });
  }

  updateMail(event) {
    console.log(event);
    this.setState({
      email: event.target.value
    });
  }

  updatePassword(event) {
    console.log(event);
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <input onChange={this.updateName} placeholder="Username" value={this.state.name} />
        <input onChange={this.updateMail} placeholder="E-Mail" value={this.state.email} />
        <input onChange={this.updatePassword} placeholder="Password" value={this.state.password} type="password" />
        <button onClick={this.logintest}>Login</button>
        <button onClick={this.userlisttest}>UserList</button>
        <button onClick={this.logouttest}>Logout</button>
        <button onClick={this.registertest}>Register</button>
        <div>{ this.state.errorList }</div>
      </React.Fragment>
    );
  }
}
