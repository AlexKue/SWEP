import React, { useState } from "react";
import {
    Table,
    Pagination,
    Icon
} from "semantic-ui-react";

const QueryResponseTable = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    let tableArray = props.tableArray.length > 0 ? [...props.tableArray] : null; // as it's in-place edition, we have to copy it
    let displayPerPage = 20;

    if (tableArray == null || tableArray.length == 0) { // shortcut pipe operator => Doesn't crash if zero
        return "Es wurden keine Einträge gefunden.";
    } else { // Process data
        // array[0] = table head
        // array[i] = table row [column1, column2, ..., columnn] (i of 0,...,n)
        let tableHeaderValues = tableArray[0];   // zeroth element has header values
        tableArray.shift()   // shift left, 0th element gets removed
        return (
            <QueryResponseTableComponent tableArray={ tableArray} tableHeaderValues={ tableHeaderValues } />
        )
    }
}

class QueryResponseTableComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.displayPerPage = 100;

        this.state = {
            activeIndex: 0,
        }
    }

    componentWillReceiveProps() {
        this.setState({ activeIndex: 0});
    }

    render() {
        return (
            <React.Fragment>
                { this.props.tableArray.length > this.displayPerPage ? 
                // Pagination
                <React.Fragment> 
                    <Pagination
                        defaultActivePage={ 1 }
                        activePage={ this.state.activeIndex + 1 }
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={ Math.ceil(this.props.tableArray.length / this.displayPerPage) }
                        onPageChange={ (event, data) => { this.setState({activeIndex: data.activePage - 1})}}
                    />
                    <Table celled>
                        <QueryResponseTableHeader headers={ this.props.tableHeaderValues } />
                        <QueryResponseTableBody rows={ this.props.tableArray.slice(
                            (this.displayPerPage * this.state.activeIndex),
                            (this.displayPerPage * (this.state.activeIndex + 1))
                        ) } />
                    </Table>
                </React.Fragment>
                :
                <Table celled>
                    <QueryResponseTableHeader headers={ this.props.tableHeaderValues } />
                    <QueryResponseTableBody rows={ this.props.tableArray } />
                </Table>
            }
            </React.Fragment>
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
    console.log(rows);
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