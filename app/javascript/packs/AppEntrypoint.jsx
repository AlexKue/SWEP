import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from '../components/App.jsx';

const customHistory = new createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={customHistory}>
      <App />
    </Router>,
    document.getElementById('root')
  )
})
