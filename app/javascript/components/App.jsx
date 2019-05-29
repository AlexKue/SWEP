import React from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import RedirectRoot from './RedirectRoot.jsx';
import Login from './LoginRegister/Login.jsx';
import Register from './LoginRegister/Register.jsx';
import Home from './Home.jsx';
import UbungsserieUbersicht from './UbungsserieUbersicht.jsx';
import Aufgabe from './Aufgabe.jsx';

export default class App extends React.Component {

  render() {
    console.log("Render called in App");
    return (
        <React.Fragment>
          <Grid style={{width: "100%", height: "100%"}}>
            <Grid.Column>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register} />
              <Route path="/home" component={Home} />
              <Route path="/sose19/hellosqrrl" render={() =>
                  <React.Fragment>
                    <Home />
                    <Aufgabe title="Hello, SQRRL!" description="Das ist die erste SQRRL Aufgabe." style={{marginTop: "50px"}}/>
                  </React.Fragment>
                } />
            </Grid.Column>
          </Grid>
        </React.Fragment>
    );
  }
};
