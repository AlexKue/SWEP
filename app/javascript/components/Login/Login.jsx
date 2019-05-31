import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

import {
  Grid,
  Button,
  Input,
  Form,
  Message
} from "semantic-ui-react";

import API from '../API/API.jsx';

export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      errorNameInput: false,
      errorPasswordInput: false,
      userID: "",
      userPass: "",
      loading: false,
      showErrorMessage: false,
      errorMessage: ""
    }

    this.toggleLoginButton = this.toggleLoginButton.bind(this);
    this.updateUserID = this.updateUserID.bind(this);
    this.updateUserPass = this.updateUserPass.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  toggleLoginButton() {
    return (this.state.userID == "" || this.state.userPass == "");
  }
  updateUserID(event) {
    this.setState({
      userID: event.target.value
    });
  }
  updateUserPass(event) {
    this.setState({
      userPass: event.target.value
    });
  }
  loginUser() {
    // TODO: Set button loading (may need refactor)
    API.loginUser(this.state.userID, this.state.userPass)
    .then(response => {
      this.props.history.push("/main"); //TODO: Add proper route
    }).catch(error => {
      console.log(error);
      this.setState({
        showErrorMessage: true,
        errorMessage: "Fehler: Irgendetwas ist schiefgelaufen" //TODO: Add proper error message
      })
    })
  }

  render() {

    return (
      <React.Fragment>
        <Form id="loginform" error={ this.state.showErrorMessage }>
          <Form.Field>
            <Input
              icon="user"
              placeholder="Nutzername / E-Mail"
              iconPosition="left"
              onChange={ this.updateUserID }
              error={ this.state.errorNameInput }/>
          </Form.Field>
          <Form.Field>
            <Input icon="key"
              placeholder="Passwort"
              iconPosition="left"
              type="password"
              onChange={ this.updateUserPass }
              error={ this.state.errorPasswordInput }/>
          </Form.Field>
          <Message
            id="errormessage"
            header="Login Fehler"
            content={ this.state.errorMessage }
            error/>
          <Grid columns={2}>
            <Grid.Column>
              <Button type="submit"
                disabled={ this.toggleLoginButton() }
                loading={ this.state.loading }
                onClick={ this.loginUser }
                primary>Einloggen</Button>
            </Grid.Column>
            <Grid.Column>
              <Button id="registerbutton"
                as={Link} to="/register"
                secondary>Registrieren</Button>
            </Grid.Column>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}
