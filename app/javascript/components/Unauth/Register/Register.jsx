import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Input,
  Form,
  Message
} from "semantic-ui-react";

import FormWrapper from '../FormWrapper/FormWrapper.jsx';
import API from '../../API/API.jsx';

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "",
      userMail: this.props.userID,
      userPass: this.props.userPass,
      userPassConf: this.props.userPass,
      showErrorMessage: false,
      errorMessage: "",
      showSuccessMessage: false,
      successMessage: ""
    }

    this.toggleRegisterButton = this.toggleRegisterButton.bind(this);
    this.updateUserNick = this.updateUserNick.bind(this);
    this.updateUserMail = this.updateUserMail.bind(this);
    this.updateUserPass = this.updateUserPass.bind(this);
    this.updateUserPassConf = this.updateUserPassConf.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }


  toggleRegisterButton() {
    return (
      this.state.userNick == "" ||
      this.state.userMail == "" ||
      this.state.userPass == "" ||
      this.state.userPassConf == "" ||
      (this.state.userPass != this.state.userPassConf)
    );
  }
  updateUserNick(event) {
    this.setState({
      userNick: event.target.value
    });
  }
  updateUserMail(event) {
    this.props.updateUserID(event.target.value);
    this.setState({
      userMail: event.target.value
    });
  }
  updateUserPass(event) {
    this.props.updateUserPass(event.target.value);
    this.setState({
      userPass: event.target.value
    });
  }
  updateUserPassConf(event) {
    this.setState({
      userPassConf: event.target.value
    });
  }
  registerUser() {
    API.registerUser(
      this.state.userNick,
      this.state.userMail,
      this.state.userPass,
      this.state.userPassConf
    ).then(response => {
      this.setState({
        showErrorMessage: false,
        showSuccessMessage: true,
        successMessage: "Registrierung erfolgreich."
      })
    }).catch(error => {
      this.setState({
        showSuccessMessage: false,
        showErrorMessage: true,
        errorMessage: error
      })
    })
  }

  render() {
    return (
      <FormWrapper>
        <Form id="registerform"
          error={ this.state.showErrorMessage }
          success={ this.state.showSuccessMessage }>
          <Form.Field>
            <Input
              icon="user"
              placeholder="Nickname"
              iconPosition="left"
              onChange={ this.updateUserNick } />
          </Form.Field>
          <Form.Field>
            <Input
              icon="at"
              placeholder="E-Mail Adresse"
              iconPosition="left"
              onChange={ this.updateUserMail }
              value={ this.state.userMail }/>
          </Form.Field>
          <Form.Field>
            <Input
              icon="key"
              placeholder="Passwort"
              iconPosition="left"
              type="password"
              onChange={ this.updateUserPass }
              value={ this.state.userPass }/>
          </Form.Field>
          <Form.Field>
            <Input
              icon="key"
              placeholder="Passwort wiederholen"
              iconPosition="left"
              type="password"
              onChange={ this.updateUserPassConf }
              value={ this.state.userPassConf }/>
          </Form.Field>
          <Message
            header="Registrierung Fehler"
            content={ this.state.errorMessage }
            error/>
          <Message
            header="Registrierung erfolgreich"
            content={ this.state.successMessage }
            success/>
          <Grid columns={2}>
            <Grid.Column>
              <Button
                as={Link} to="/login"
                icon="left arrow"
                labelPosition="left"
                content="Zurück"
                secondary/>
            </Grid.Column>
            <Grid.Column>
              <Button
                id="registerbutton"
                type="submit"
                content="Registrieren"
                disabled={ this.toggleRegisterButton() }
                onClick={ this.registerUser }
                primary/>
            </Grid.Column>
          </Grid>
        </Form>
      </FormWrapper>
    );
  }
}
