import React, { useContext } from "react";
import {
    Grid,
    Header,
    Button,
    Loader
} from "semantic-ui-react";

// Import Statements for CodeMirror and SQL Syntax Highlighting
import { Controlled as CodeMirror } from "react-codemirror2";
require('codemirror/mode/sql/sql');

import AuthedContext from '../../AuthedContext.jsx';

const ExerciseView = (props) => {
    let context = useContext(AuthedContext);

    if (props.type == "spielwiese") {
        return <ExerciseViewComponent type="spielwiese" />
    }
    
    let exerciseId = parseInt(props.match.params.exerciseId);
    let categoryId = parseInt(props.match.params.categoryId);

    if (!context.getCategoryById(categoryId).exerciseIdSet.has(exerciseId)) {
        props.history.push("/404");
        return null;
    }
    return <ExerciseViewComponent key={ "exv_" + exerciseId }
                context={ context }
                exerciseId={ exerciseId }
                categoryId={ categoryId } />
}

class ExerciseViewComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            storedQuery: "",
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryLoading: false,
            queryResult: <h1>Hier k&ouml;nnte ihr Result stehen.</h1>,
            context: props.context,
            initialized: false
        }

        if (props.type == "spielwiese") {
            this.state.title = "Spielwiese";
            this.state.description = "Dies ist die Spielwiese. Hier können Queries abgeschickt und getestet werden, ohne eine Aufgabe zu bearbeiten.";
            this.state.initialized = true;
        } else {
            let exercise = props.context.getExerciseById(props.exerciseId);
            if (exercise.getUserQuery()) {   // Don't show loading icon, we fetched the entire exercise already
                this.state.title = exercise.title;
                this.state.description = exercise.description;
                this.state.storedQuery = exercise.getUserQuery();
                this.state.initialized = true
            }
        }
    }

    updateQuery = (content) => {
        this.setState({
            storedQuery: content
        });
    }
    sendQuery = () => {
        this.setState({
            queryLoading: true
        });
        // Implement logic for sending, receiving and updating
        if (props.type == "spielwiese") {

        } else { // this is a proper exercise

        }
    }
    forceUpdate = () => {
        this.setState({
            state: this.state
        });
    }

    componentDidMount() {
        let exerciseId = this.props.exerciseId;
        if (!this.state.initialized) {
            this.props.context.fetchExerciseInformation(exerciseId)
            .then(response => {
                let exercise = this.state.context.getExerciseById(exerciseId);
                this.setState({
                    title: exercise.title,
                    description: exercise.description,
                    storedQuery: exercise.getUserQuery()
                });
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                this.setState({
                    initialized: true
                });
            })
        }
    }

    render() {
        if (this.state.initialized) {
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
                                onBeforeChange={ (editor, data, value) => this.updateQuery(value) }/>
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
        } else {
            return <Loader active>Lade Übung...</Loader>
        }
    }
}

export default ExerciseView;