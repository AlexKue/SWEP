import React from "react";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Input,
  Grid
} from "semantic-ui-react";

import FormWrapper from './FormWrapper.jsx';

export default class Login extends React.Component {
  render() {
    console.log("Render called in Login");
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
            <Grid.Column>
              <Button content="Einloggen" />
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
