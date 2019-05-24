import React from "react";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Input,
  Grid
} from "semantic-ui-react";

import FormWrapper from './FormWrapper.jsx';

export default class Register extends React.Component {
  render() {
    console.log("Render called in Register");
    return (
      <FormWrapper>
        <Form.Field>
          <Input icon="user" iconPosition="left" placeholder="Nutzername / E-Mail" />
        </Form.Field>
        <Form.Field>
          <Input icon="key" iconPosition="left" placeholder="Passwort" type="password" />
        </Form.Field>
        <Form.Field>
          <Input icon="key" iconPosition="left" placeholder="Passwort wiederholen" type="password" />
        </Form.Field>
        <Form.Field>
          <Grid columns={2}>
            <Grid.Column>
              <Link to="/login"><Button content="Zur&uuml;ck" id="backButton" labelPosition="left" icon="left arrow"/></Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/login#sentregistration"><Button content="Abschicken" id="sendButton" primary/></Link>
            </Grid.Column>
          </Grid>
        </Form.Field>
      </FormWrapper>
    );
  }
}
