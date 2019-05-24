import React from "react";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Input,
  Grid,
  Segment
} from "semantic-ui-react";

import FormWrapper from './FormWrapper.jsx';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

  }

  renderMessage() {
    if (this.props.location.hash == "#sentregistration") {
      return (
        <Grid.Row id="messageRowSuccess" columns={1}>
          <Grid.Column>
            <Segment color="green" size="small" inverted>Registrierung wurde abgeschickt.</Segment>
          </Grid.Column>
        </Grid.Row>
      );
    }
  }

  render() {
    console.log("Render called in Login");
    console.log(this.props);
    return (
      <FormWrapper>
        <Form.Field>
          <Input icon="user" iconPosition="left" placeholder="Nutzername / E-Mail" />
        </Form.Field>
        <Form.Field>
          <Input icon="key" iconPosition="left" placeholder="Passwort" type="password" />
        </Form.Field>
        <Form.Field>
          <Grid columns={2}>
            { this.renderMessage() }
            <Grid.Column>
              <Button content="Einloggen" primary/>
            </Grid.Column>
            <Grid.Column>
              <Link to="/register">
                <Button content="Registrieren" icon="right arrow" labelPosition="right" id="registerButton" />
              </Link>
            </Grid.Column>
          </Grid>
        </Form.Field>
      </FormWrapper>
    );
  }
}
