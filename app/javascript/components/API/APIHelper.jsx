import React from "react";
import {
  List,
  Message
} from "semantic-ui-react";

export default class APIHelper {
  static makeRegisterErrorList(error) {
    let errorData = error.response.data;
    return (
      <List bulleted>
        {errorData.map((message => <List.Item key={message}>{message}</List.Item>))}
      </List>
    );
  }
}
