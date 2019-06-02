import React from "react";

import Register from './Register.jsx';
import { FormWrapperContextConsumer } from '../FormWrapper/FormWrapperContext.jsx';

export default class LoginHOC extends React.Component {
  render() {
    return (
      <FormWrapperContextConsumer>
        {(value) =>
          <Register
            userID={ value.userID } updateUserID={ value.updateUserID }
            userPass={ value.userPass } updateUserPass={ value.updateUserPass }/>
        }
      </FormWrapperContextConsumer>
    );
  }
}
