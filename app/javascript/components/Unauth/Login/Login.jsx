import React from "react";
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import {
  Grid,
  Button,
  Input,
  Form,
  Message,
  Image
} from "semantic-ui-react";
import SQRRL_logo from "images/SQRRL_LOGO.png";

import FormWrapper from '../FormWrapper/FormWrapper.jsx';
import API from '../../API/API.jsx';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorNameInput: false,
      errorPasswordInput: false,
      userID: this.props.userID,
      userPass: this.props.userPass,
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
    this.props.updateUserID(event.target.value);
    this.setState({
      userID: event.target.value
    });
  }
  updateUserPass(event) {
    this.props.updateUserPass(event.target.value);
    this.setState({
      userPass: event.target.value
    })
  }
  loginUser() {
    this.setState({loading: true});
    API.loginUser(this.state.userID, this.state.userPass)
    .then(response => {
      let data = response.data;
      this.props.setUserLoggedIn(true, data.role, data.name, data.email, data.id, data.hide_in_ranking);
    }).catch(error => {
      console.log(error);
      this.setState({
        showErrorMessage: true,
        errorMessage: "Die Kombination aus E-Mail und Passwort wurde nicht gefunden.",
        loading: false
      })
    })
  }

  render() {
    return (
      <FormWrapper>
        <Form id="loginform" error={ this.state.showErrorMessage }>
          <Grid columns={2}>
            <Grid.Column style={{ maxWidth: "188px", padding: "8px"}} verticalAlign="middle">
              <Image src={ SQRRL_logo } style={{maxHeight: "250px"}} />
            </Grid.Column>
            <Grid.Column id="bottomLoginColumn" verticalAlign="middle">
              <h1>SQRRL-Login</h1>
              <Form.Field>
                <Input
                  icon="user"
                  placeholder="E-Mail Adresse"
                  iconPosition="left"
                  onChange={ this.updateUserID }
                  error={ this.state.errorNameInput }
                  value={ this.state.userID }/>
              </Form.Field>
              <Form.Field>
                <Input icon="key"
                  placeholder="Passwort"
                  iconPosition="left"
                  type="password"
                  onChange={ this.updateUserPass }
                  error={ this.state.errorPasswordInput }
                  value={ this.state.userPass }/>
              </Form.Field>
              <Message
                header="Login Fehler"
                content={ this.state.errorMessage }
                error/>
              <Grid columns={2}>
                <Grid.Column>
                  <Button type="submit"
                    disabled={ this.toggleLoginButton() || this.state.loading }
                    loading={ this.state.loading }
                    onClick={ this.loginUser }
                    primary>Einloggen</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button id="toRegisterButton"
                    as={Link} to="/register"
                    icon="right arrow"
                    labelPosition="right"
                    content="Registrieren"
                    secondary/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Form>
      </FormWrapper>
    );
  }
}

export default Login = withRouter(Login);
