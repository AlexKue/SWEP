import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Grid
} from "semantic-ui-react";

export default class UbungsserieUbersicht extends React.Component {
  render() {
    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>Hello, SQRRL!</Grid.Column>
          <Grid.Column>
            <Grid columns={2} divided>
              <Grid.Column>{ this.props.nof }</Grid.Column>
              <Grid.Column><Link to={ this.props.link }>Gehe zu</Link></Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
