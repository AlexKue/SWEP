import React from "react";
import {
  Grid
} from "semantic-ui-react";

export default class FormWrapper extends React.Component {
  render() {
    return (
      <Grid id="formwrapper" verticalAlign="middle">
        <Grid.Column>
          { this.props.children }
        </Grid.Column>
      </Grid>
    );
  }
}
