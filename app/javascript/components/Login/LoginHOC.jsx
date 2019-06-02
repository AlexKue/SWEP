import React from "react";

import Login from './Login.jsx';
import { FormWrapperContextConsumer } from '../FormWrapper/FormWrapperContext.jsx';

export default class LoginHOC extends React.Component {
  render() {
    return (
      <FormWrapperContextConsumer>
        {(value) =>
          <Login
            userID={ value.userID } updateUserID={ value.updateUserID }
            userPass={ value.userPass } updateUserPass={ value.updateUserPass }/>
        }
      </FormWrapperContextConsumer>
    );
  }
}
