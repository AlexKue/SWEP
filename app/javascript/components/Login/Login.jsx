import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

import {
  Grid,
  Button,
  Input,
  Form,
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
  }

  render() {

    return (
      <React.Fragment>
        <Form id="loginform">
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
