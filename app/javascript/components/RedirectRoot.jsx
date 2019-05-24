import React from "react";
import {
  BrowserRouter as Router,
  Redirect
  } from "react-router-dom";

export default class RedirectRoot extends React.Component {
  render() {
    console.log('Redirect from "/" to "/login"');
    return (
      <Redirect to="/login" />
    );
  }
};
