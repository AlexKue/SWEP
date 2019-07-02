import React from "react";
import {
    Table
} from "semantic-ui-react";

const QueryResponseTable = (props) => {
    let tableArray = props.tableArray;

    if (tableArray.length == 0) {
        return "Es wurden keine Einträge gefunden.";
    } else { // Process data
        // array[0] = table head
        // array[i] = table row [column1, column2, ..., columnn] (i of 0,...,n)
        let tableHeaderValues = tableArray[0];   // zeroth element has header values
        tableArray.shift()   // shift left, 0th element gets removed
        return (
            <Table celled>
                <QueryResponseTableHeader headers={ tableHeaderValues } />
                <QueryResponseTableBody rows={ tableArray } />
            </Table>
        )
    }
}

const QueryResponseTableHeader = (props) => {
    let headers = props.headers;
    let headerComponents = headers.map((header) => <Table.HeaderCell key={"rsp_h_" + header}>{ header }</Table.HeaderCell>)
    return (
        <Table.Header>
            <Table.Row>
                { headerComponents }
            </Table.Row>
        </Table.Header>
    );
}

const QueryResponseTableBody = (props) => {
    let rows = props.rows;
    let rowComponents = rows.map((row) => {
        return (
            <Table.Row>
                {row.map((cell) => {
                    return <Table.Cell>{ cell }</Table.Cell>
                })}
            </Table.Row>
        )
    });
    return rowComponents;
}

export default QueryResponseTable;