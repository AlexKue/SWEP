import React, { useContext} from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import {
    Segment,
    Form,
    Divider,
    Tab,
    Loader,
    Message,
    Grid,
    Button
} from "semantic-ui-react";

import CodeMirror from "react-codemirror";
require("codemirror/mode/sql/sql");

import API from '../../../API/API.jsx';
import AuthedContext from '../../AuthedContext.jsx';

const CRUDExerciseView = (props) => {

    const context = useContext(AuthedContext);

    let exercise = null;
    let exerciseId = parseInt(props.match.params.exerciseId);
    let categoryId = parseInt(props.match.params.categoryId);

    if (exerciseId) {
        exercise = context.getExerciseById(exerciseId);
    }

    return <CRUDExerciseViewComponent 
                context={context} 
                title={ exercise ? exercise.title : null }
                description={ exercise ? exercise.description : null}
                exerciseId={exerciseId}
                categoryId={categoryId}
                {...props} />
}

export default CRUDExerciseView;

class CRUDExerciseViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.addQueryButton = { menuItem: "Query Hinzufügen", render: () => null };
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            id: props.id ? parseInt(props.id) : -1,                   // set null if this is a new exercise
            context: props.context,
            history: props.history,
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryList: [],
            queryPanes: [],
            queriesInitialized: false,
            crudExerciseLoading: false,
            points: 1,
            error: false,
            success: false,
            messageTitle: "",
            messageContent: "",
            context: props.context
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
    updatePoints = (event) => {
        this.setState({
            points: event.target.value
        });
    }
    crudExercise = () => {
        this.setState({
            crudExerciseLoading: true
        });
        if (this.state.id) {    // component has ID ==> Update
            // TODO
        } else {
            API.createExercise(this.props.categoryId, this.state.title, this.state.description, this.state.points)
            .then(response => {
                this.state.context.addExercise(
                    this.props.categoryId,
                    this.state.title, 
                    this.state.description, 
                    this.state.points, 
                    parseInt(response.data.id), 
                    false);
                this.setState({
                    id: response.data.id,
                    error: false,
                    success: true,
                    messageTitle: "Erfolg",
                    messageContent: "Die Übung wurde erfolgreich erstellt."
                })
            }).catch(error => {
                this.setState({
                    error: true,
                    success: false,
                    messageTitle: "Fehler",
                    messageContent: error
                })
            }).finally(() => {
                this.setState({
                    crudExerciseLoading: false
                });
            });
        }
    }

    handleTabChange = (event, data) => {
        if (data.activeIndex == this.state.queryPanes.length) { // If the last element was clicked
            // add a new query, local
            let query = "INSERT INTO Here VALUES('Query')";
            let queryPanesLength = this.state.queryPanes.length;
            let newQueryList = this.state.queryList.concat([new Query(null, "INSERT INTO Here VALUES('Query')")]);
            let newQueryPanes = this.state.queryPanes.concat([{
                menuItem: "Query " + (this.state.queryPanes.length + 1),
                render: () => 
                    <QueryComponent 
                        key={Math.random()} 
                        options={ this.state.codeMirrorOptions }
                        />
                }]);
            console.log(newQueryPanes);
            this.setState({
                queryList: newQueryList,
                queryPanes: newQueryPanes
            });
        }
    }

    componentDidMount() {   // Start processing of query list data
        if (this.props.queryList) {
            // do processing here
        } else {
            // Else case just sets loading true
            this.setState({
                queriesInitialized: true,
                queryPanes: []
            });
        }
    }
    hideMessage = () => {
        this.setState({
            error: false,
            success: false
        })
    }


    render () {
        return (
            <Segment>
                <Form
                    error={ this.state.error }
                    success={ this.state.success }>
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
                    <Form.Input
                        label="Punkte"
                        placeholder="1"
                        value={ this.state.points }
                        onChange={ this.updatePoints }
                        />
                    <Form.Button
                        type="submit"
                        content="Abschicken"
                        onClick={ this.crudExercise } 
                        disabled={ this.state.crudExerciseLoading }
                        loading={ this.state.crudExerciseLoading }/>
                    <Message
                        header={ this.state.messageTitle }
                        content={ this.state.messageContent }
                        onDismiss={ this.hideMessage }
                        success
                        />
                    <Message
                        header={ this.state.messageTitle }
                        content={ this.state.messageContent }
                        onDismiss={ this.hideMessage }
                        error
                        />
                    { !this.state.id ?
                        <label>Hinweis: Die Aufgabe muss erstellt werden um Queries hinzuzufügen.</label>
                        : 
                        <React.Fragment>
                            <Divider />
                            <Form.Field>
                                <label>Hinterlegte Queries</label>
                                { this.state.queriesInitialized ? 
                                    <Tab 
                                        menu={{
                                            fluid: true, 
                                            vertical: true, 
                                            }} 
                                        panes={ this.state.queryPanes.concat(this.addQueryButton) } 
                                        onTabChange={ this.handleTabChange }/>
                                    : <Loader active style={{margin: "auto"}}>Lade Queries...</Loader> }
                            </Form.Field>
                        </React.Fragment>
                    }
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

class QueryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id ? props.id : null,
            query: props.query ? props.query : "INSERT INTO Here VALUES('Query')"
        }
    }

    updateQuery = (content) => {
        this.setState({
            query: content 
        });
    }

    render() {
        return (
            <Tab.Pane>
                <CodeMirror
                    options={ this.props.options }
                    value={ this.state.query }
                    onChange={ this.updateQuery }
                    />
                <Grid columns={2}>
                    <Grid.Column>
                        <Form.Button
                            content="Abschicken" />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Button
                            content="Löschen"
                            color="red" 
                            style={{float: "right"}}/>
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}