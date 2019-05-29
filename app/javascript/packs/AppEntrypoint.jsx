import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import RedirectRoot from '../components/RedirectRoot.jsx';
import App from '../components/App.jsx';

const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={history}>
        <Route exact path="/" component={RedirectRoot} />
        <App />
    </Router>,
    document.getElementById('root')
  )
})
