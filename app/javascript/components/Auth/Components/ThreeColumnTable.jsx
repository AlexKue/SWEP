import React from "react";
import { 
    Table,
    Segment
} from "semantic-ui-react";

export default class ThreeColumnTable extends React.Component {

    render() {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">
                        { this.props.title }
                        { this.props.withDescription ? 
                        <Segment style={{fontWeight: "normal"}}>{ this.props.description }</Segment>
                        : null}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.props.children }
                </Table.Body>
            </Table>
        );
    }
}

export class ThreeColumnTableRow extends React.Component {
    
    render() {
        return (
            <Table.Row>
                <Table.Cell>{ this.props.firstContent }</Table.Cell>
                <Table.Cell collapsing textAlign="right">{ this.props.secondContent}</Table.Cell>
                <Table.Cell collapsing>{ this.props.thirdContent }</Table.Cell>
            </Table.Row>
        );
    }
}