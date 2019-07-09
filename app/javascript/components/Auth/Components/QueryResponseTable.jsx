import React from "react";
import {
    Table
} from "semantic-ui-react";

const QueryResponseTable = (props) => {
    let tableArray = [...props.tableArray]; // as it's in-place edition, we have to copy it

    if (tableArray == null || tableArray.length == 0) { // shortcut pipe operator => Doesn't crash if zero
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
    let headerCellId = 0;
    let headerComponents = headers.map((header) => <Table.HeaderCell key={ "rsp_h_" + header + "_" + headerCellId++ }>{ header }</Table.HeaderCell>)
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
    let rowId = 0;
    let cellId = 0;
    let rowComponents = rows.map((row) => {
        return (
            <Table.Body key={ "rsp_r_" + row + "_" + rowId++ }>
                <Table.Row>
                    {row.map((cell) => {
                        return <Table.Cell key={ "rsp_c_" + cell + "_" + rowId + "_" + cellId++ } >{ cell }</Table.Cell>
                    })}
                </Table.Row>
            </Table.Body>
        )
    });
    return rowComponents;
}

export default QueryResponseTable;