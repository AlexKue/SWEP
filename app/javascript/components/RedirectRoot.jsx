import React from 'react';
import {
  BrowserRouter as Router,
  Redirect
  } from "react-router-dom";

export default class RedirectRoot extends React.Component {
  render() {
    return (
      <Redirect to="/login" />
    );
  }
};
