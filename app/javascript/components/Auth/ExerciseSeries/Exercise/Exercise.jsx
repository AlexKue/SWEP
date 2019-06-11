import React from "react";
import {
    Grid,
    Header,
    Button
} from "semantic-ui-react";

// Import Statements for CodeMirror and SQL Syntax Highlighting
import CodeMirror from "react-codemirror";
require("codemirror/mode/sql/sql");

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            description: props.description,
            storedQuery: props.query,
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryLoading: false,
            queryResult: <h1>Hier k&ouml;nnte ihr Result stehen.</h1>
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    updateQuery(content) {
        this.setState({
            storedQuery: content
        });
    }
    sendQuery() {
        this.setState({
            queryLoading: true
        });
        // Implement logic for sending, receiving and updating
    }

    render() {
        return (
            <Grid divided="vertically" id="exerciseGrid">
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" dividing>{ this.state.title }</Header>
                        <p>{ this.state.description }</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <CodeMirror
                            value={ this.state.storedQuery }
                            options={ this.state.codeMirrorOptions }
                            onChange={ this.updateQuery }/>
                        <Button 
                            content="Abschicken"
                            onClick={ this.sendQuery }
                            loading={ this.state.queryLoading }/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        { this.state.queryResult }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}