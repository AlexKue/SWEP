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

    let exerciseId = parseInt(props.match.params.exerciseId);
    let categoryId = parseInt(props.match.params.categoryId);

    return <CRUDExerciseViewComponent 
                context={context}
                exerciseId={exerciseId}
                categoryId={categoryId}
                {...props} />
}

export default CRUDExerciseView;

class CRUDExerciseViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.addQueryButton = { menuItem: "Query Hinzufügen", render: () => {
            let queryCount = this.state.queryPanes.length;
            if (queryCount > 0) {   // There can be at most one untracked query
                return <label>Bitte erst Query {queryCount} abschicken.</label>
            } else {    // There's no query so far, so we don't show to submit the untracked query
                return null;
            }
        }};
        this.state = {
            title: "",
            description: "",
            id: props.exerciseId ? parseInt(props.exerciseId) : -1,                   // set null if this is a new exercise
            history: props.history,
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryMap: new Map(),
            queryPanes: [],
            queriesInitialized: false,
            crudExerciseLoading: false,
            points: 1,
            error: false,
            success: false,
            messageTitle: "",
            messageContent: "",
            initialized: props.exerciseId ? false : true,    // It's initialized if it's new
            loaderText: "Lade Übung",
            context: props.context
        };
    }

    forceUpdate = () => {
        this.setState({
            state: this.state
        });
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
    updateQueryLocal = (queryId, query) => {
        this.state.queryMap.set(queryId, query);
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
        if (data.activeIndex == this.state.queryPanes.length    // If the last element was clicked
            && !this.state.queryMap.get(-1)) {                  // And there is no -1 Object (unsubmittet query) 
            // This ensures that there'll be at most one untracked query. Necessary for dealing with ID's
            // add a new query, local
            this.state.queryMap.set(-1, "INSERT INTO Here VALUES('Query')");    // Add Query with ID -1 
            let newQueryPanes = this.state.queryPanes.concat([{
                menuItem: "Query " + (this.state.queryPanes.length + 1),
                render: () => 
                    <QueryComponent 
                        options={ this.state.codeMirrorOptions }
                        id={-1}
                        key={-1}
                        query={ this.state.queryMap.get(-1) }                   // Link it to state.queryMap.get(-1), so state updates will affect
                        updateQueryLocal={ this.updateQueryLocal }
                        />
                }]);

            this.setState({
                queryPanes: newQueryPanes
            });
        }
    }

    componentDidMount() {   // Start processing of query list data
        let exerciseId = this.props.exerciseId;
        if (!exerciseId) return; // No need to fetch anything if this is a new exercise
        if (this.state.context.getExerciseById(exerciseId).description) {
            // TODO
        } else { // We have to fetch everything <=> Initialize this exercise
            this.state.context.fetchExerciseInformation(exerciseId)
            .then(response => {
                let exercise = this.state.context.getExerciseById(exerciseId);
                this.setState({
                    title: exercise.title,
                    description: exercise.description
                });
                // TODO: Fetch Queries
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                this.setState({
                    initialized: true,
                    queriesInitialized: true
                });
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
        if (this.state.initialized) {
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
        } else {
            return <Loader active>{ this.state.loaderText }</Loader>
        }
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
            id: props.id,
            query: props.query ? props.query : "INSERT INTO Here VALUES('Query')"
        }
    }

    updateQuery = (content) => {
        this.props.updateQueryLocal(this.state.id, content);
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