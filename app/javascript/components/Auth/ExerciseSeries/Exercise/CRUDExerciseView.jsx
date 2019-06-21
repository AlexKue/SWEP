import React, { useContext} from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import {
    Segment,
    Form,
    List,
    Divider
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
            queryComponentList: props.queryList ? props.queryList : [], // TODO: Add queries depending on received ones
            id: props.id ? parseInt(props.id) : null,
            context: props.context,
            history: props.history,
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            }
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
    addQuery = () => {
        // TODO: Maybe make own component for that
        const updatedList = this.state.queryComponentList.concat(
            <List.Item>
                <Form.Field>
                    <label><Link to="#" onClick={ this.deleteQuery } style={{color: "red"}}>Query Löschen</Link></label>
                    <CodeMirror
                        options={ this.state.codeMirrorOptions } 
                        value="INSERT INTO Here VALUES('Query')"/>
                </Form.Field>
            </List.Item>
        );
        this.setState({
            queryComponentList: updatedList
        });
    }
    deleteQuery = () => {
        console.log("TODO");
    }
    crudExercise = () => {
        // TODO
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
                    <Divider />
                    <Form.Field>
                        <label>Hinterlegte Queries</label>
                        <List divided>
                            { this.state.queryComponentList }
                            <List.Item>
                                <Form.Button
                                    type="reset"
                                    content="Query hinzufügen" 
                                    onClick={ this.addQuery }/>
                            </List.Item>
                        </List>
                    </Form.Field>
                    <Divider />
                    <Form.Button
                        type="submit"
                        content="Abschicken"
                        onClick={ this.crudExercise } />
                </Form>
            </Segment>
        );
    }
}