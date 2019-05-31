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
        {Object.keys(errorData).map(key => (
          <List.Item key={key}>
            {key}
            <List>
              {errorData[key].map(value => (
                <List.Item key={value}>{ value }</List.Item>
              ))}
            </List>
          </List.Item>
        ))}
      </List>
    );
  }
}
