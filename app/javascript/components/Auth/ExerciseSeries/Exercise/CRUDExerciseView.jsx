import React, { useContext} from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import {
    Segment,
    Form,
    Divider,
    Tab,
    Loader
} from "semantic-ui-react";

import CodeMirror from "react-codemirror";
require("codemirror/mode/sql/sql");

import AuthedContext from '../../AuthedContext.jsx';

const CRUDExerciseView = (props) => {

    const context = useContext(AuthedContext);

    return <CRUDExerciseViewComponent context={context} {...props} />
}

export default CRUDExerciseView;

class CRUDExerciseViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.addQueryButton = { menuItem: "Query Hinzufügen", render: () => null };
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            id: props.id ? parseInt(props.id) : null,                   // set null if this is a new exercise
            context: props.context,
            history: props.history,
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryList: [],
            queryPanes: [],
            queriesInitialized: false
        };
    }

    updateTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }
    updateDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    crudExercise = () => {
        // TODO
    }

    handleTabChange = (event, data) => {
        if (data.activeIndex + 1 == this.state.queryPanes.length) { // If the last element was clicked
            // Add query Component
        }
    }

    componentDidMount() {   // Start processing of query list data
        if (this.props.queryList) {
            // do processing here
        } else {
            // Else case just sets loading true
            this.setState({
                queriesInitialized: true,
                queryPanes: [this.addQueryButton]
            });
        }
    }


    render () {
        return (
            <Segment>
                <Form>
                    <Form.Input
                        label="Titel"
                        placeholder="Titel"
                        value={ this.state.title }
                        onChange={ this.updateTitle }
                        />
                    <Form.Field>
                        <label>Beschreibung</label>
                        <TextareaAutosize
                            placeholder="Beschreibung"
                            value={ this.state.description }
                            onChange={ this.updateDescription }
                            />
                    </Form.Field>
                    <Form.Button
                        type="submit"
                        content="Abschicken"
                        onClick={ this.crudExercise } />
                    <Divider />
                    <Form.Field>
                        <label>Hinterlegte Queries</label>
                        { this.state.queriesInitialized ? 
                            <Tab 
                                menu={{
                                    fluid: true, 
                                    vertical: true, 
                                    }} 
                                panes={ this.state.queryPanes } 
                                onTabChange={ this.handleTabChange }/>
                            : <Loader active style={{margin: "auto"}}>Lade Queries...</Loader> }
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

class Query {
    constructor(id, queryValue) {
        this.id = id;
        this.queryValue = queryValue;
    }
}