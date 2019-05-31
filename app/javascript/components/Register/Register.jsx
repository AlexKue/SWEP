import React from "react";
import {
  Form,
  Button,
  Input,
  Grid
} from "semantic-ui-react"

import API from '../API/API.jsx';

export default class Register extends React.Component {

  render() {

    return (
      <Form id="registerform">
        <Form.Field>
          <Input
            icon="user"
            placeholder="Nickname"
            iconPosition="left" />
        </Form.Field>
        <Form.Field>
          <Input
            icon="at"
            placeholder="E-Mail Adresse"
            iconPosition="left" />
        </Form.Field>
        <Form.Field>
          <Input
            icon="key"
            placeholder="Passwort"
            iconPosition="left"
            type="password"/>
        </Form.Field>
        <Form.Field>
          <Input
            icon="key"
            placeholder="Passwort wiederholen"
            iconPosition="left"
            type="password" />
        </Form.Field>
        <Grid columns={2}>
          <Grid.Column>
            <Button
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
              primary/>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}
