import React from "react";

const FormWrapperContext = React.createContext();

export class FormWrapperContextProvider extends React.Component {

  constructor() {
    super();

    this.state = {
      userID: "test@example.com",
      userPass: "test123",
      updateUserID: this.updateUserID.bind(this),
      updateUserPass: this.updateUserPass.bind(this)
    }
  }

  updateUserID(newUserID) {
    this.setState({
      userID: newUserID
    });
  }
  updateUserPass(newUserPass) {
    this.setState({
      userPass: newUserPass
    });
  }

  render() {
    return (
      <FormWrapperContext.Provider value={ this.state }>
        { this.props.children }
      </FormWrapperContext.Provider>
    )
  }
}

export const FormWrapperContextConsumer = FormWrapperContext.Consumer;
