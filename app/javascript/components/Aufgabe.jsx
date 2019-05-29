import React from "react";
import {
  Container,
  Header,
  Divider,
  Form,
  TextArea,
  Button,
  Icon
} from "semantic-ui-react";

export default class Aufgabe extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container style={{marginTop: "50px"}}>
          <Header as="h2">{ this.props.title }</Header>
          <Divider />
          <p>{ this.props.description }</p>
          <Divider />
          <Form><TextArea placeholder="Enter query here" style={{marginBottom: 10}}/>
            <Button>Query Abschicken</Button>
            <Button labelPosition="left" icon="save" content="Speichern" />
          </Form>
          <Divider />
          <p>OUTPUT</p>
        </Container>
      </React.Fragment>
    );
  }
}
