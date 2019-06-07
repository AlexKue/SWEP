import React from "react";
import {
    Grid,
    Form,
    Header
} from "semantic-ui-react";
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
            }
        }

        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(content) {
        this.setState({
            storedQuery: content
        });
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}