import React, { useContext} from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import {
    Segment,
    Form,
    Divider,
    Tab,
    Button
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
            queryPanes: [ { menuItem: "Query Hinzufügen", render: () => "Query hinzufügen"} ]
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
        console.log(data.activeIndex);
        console.log(data);
        console.log(this.state.queryPanes.length);
        if ((data.activeIndex + 1) == this.state.queryPanes.length) { /* If the last element was clicked */
            let queryPanes = [{menuItem: "test", render: () => "Test" }];
            console.log(this.state.queryPanes);
            queryPanes = queryPanes.concat(this.state.queryPanes);
    
            this.setState({
                queryPanes: queryPanes
            })
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
                        <Tab 
                            menu={{
                                fluid: true, 
                                vertical: true, 
                                }} 
                            panes={ this.state.queryPanes } 
                            onTabChange={ this.handleTabChange }/>
                    </Form.Field>
                    <Divider />
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