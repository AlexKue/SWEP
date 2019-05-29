import React from "react";
import {
  Form,
  Grid
} from "semantic-ui-react";

export default class FormWrapper extends React.Component {
  render() {
    console.log("Render called in FormWrapper");
    return (
      <Grid centered verticalAlign="middle" id="FormWrapperOuter">
        <Grid.Column width={12}>
          <Form id="FormWrapperInner">
            { this.props.children }
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
