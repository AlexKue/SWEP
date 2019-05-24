import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import RedirectRoot from './RedirectRoot.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

export default class App extends React.Component {

  render() {
    console.log("Render called in App");
    return (
      <Router>
        {/* This has to be replaced by some if / else depending on logged in*/}
        <Route exact path="/" component={RedirectRoot} />
        <Grid style={{width: "100%", height: "100%"}}>
          <Grid.Column>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
};
