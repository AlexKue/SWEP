import React from "react";
import { 
    Table,
    Segment,
    Icon
} from "semantic-ui-react";

import LineBreakComponent from './LineBreakComponent.jsx';

export default class ThreeColumnTable extends React.Component {

    render() {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">
                        { this.props.title }
                        { this.props.withDescription ? 
                        <Segment style={{fontWeight: "normal"}}>
                            <LineBreakComponent text={this.props.description} />
                        </Segment>
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
            <Table.Row positive={ this.props.status === true } negative={ this.props.status === false && this.props.student } warning={ this.props.status === null }>
                <Table.Cell>
                    { this.props.status === true ?
                        <Icon color="green" name="checkmark" />
                        : null}
                    { this.props.status === null ?
                        <Icon color="yellow" name="question" /> 
                        : null }
                    { this.props.firstContent }
                </Table.Cell>
                <Table.Cell collapsing textAlign="right">{ this.props.secondContent}</Table.Cell>
                <Table.Cell collapsing>{ this.props.thirdContent }</Table.Cell>
            </Table.Row>
        );
    }
}