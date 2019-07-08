import React, { useContext } from "react";
import {
    Grid,
    Header,
    Button,
    Loader,
    Icon,
    Transition
} from "semantic-ui-react";

// Import Statements for CodeMirror and SQL Syntax Highlighting
import { Controlled as CodeMirror } from "react-codemirror2";
require('codemirror/mode/sql/sql');

import AuthedContext from '../../AuthedContext.jsx';
import API from "../../../API/API.jsx";
import QueryResponseTable from '../../Components/QueryResponseTable.jsx';
import { MarkdownRenderer } from '../../Components/MarkdownEditor.jsx';

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
            queryResult: <p>Das Resultat wird bei Abschicken hier angezeigt.</p>,
            solved: false,
            context: props.context,
            initialized: false,
            animation: "tada",
            duration: 500,
            visibleRed: true,
            visibleYellow: true,
            visibleGreen: true
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
                this.state.solved = exercise.isSolved();
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
        if (this.props.type == "spielwiese") {
            API.sendQueryToPlayground(this.state.storedQuery)
            .then(response => {
                this.setState({
                    queryResult: <QueryResponseTable tableArray={ response.data } />
                })
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                this.setState({
                    queryLoading: false
                })
            })
        } else { // this is a proper exercise
            API.solveExercise(this.props.exerciseId, this.state.storedQuery)
            .then(response => {
                let exercise = this.state.context.getExerciseById(this.props.exerciseId);
                if (!exercise.isSolved()) { // First time we're solving this exercise => Set this (otherwise it'll be initialized)
                    exercise.setSolved(response.data.solved);
                    let category = this.state.context.getCategoryById(this.props.categoryId);
                    if (response.data.solved) category.incrementSolvedCount();  // We may have uncertainty, so we don't increment yet
                }
                let solved = response.data.solved;
                if (solved === false) {
                    this.setState(prevState => ({
                        solved: false,
                        visibleRed: !prevState.visibleRed
                    }));
                } else if (solved === null) {
                    this.setState(prevState => ({
                        solved: null,
                        visibleYellow: !prevState.visibleYellow
                    }));
                } else if (solved === true) {
                    this.setState(prevState => ({
                        solved: true,
                        visibleGreen: !prevState.visibleGreen
                    }));
                }
                this.setState(prevState => ({
                    queryResult: <QueryResponseTable tableArray={ response.data.result } />
                }));
            }).catch(error => {
                // Shouldn't happen
                console.error(error);
            }).finally(() => {
                this.setState({
                    queryLoading: false
                });
            })
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
                    storedQuery: exercise.getUserQuery(),
                    solved: exercise.solved
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

    solutionIndicator = () => {
        return (
            <React.Fragment>
                <Transition animation={ this.state.animation } duration={ this.state.duration } visible={ this.state.visibleRed }>
                    <Icon name={ this.state.solved === false ? 'times circle' : 'circle outline' } size="big" color="red"/>
                </Transition>
                <Transition animation={ this.state.animation } duration={ this.state.duration } visible={ this.state.visibleYello }>
                    <Icon name={ this.state.solved === null ? 'question circle' : 'circle outline' } size="big" color="yellow"/>
                </Transition>
                <Transition animation={ this.state.animation } duration={ this.state.duration } visible={ this.state.visibleGreen }>
                    <Icon name={ this.state.solved === true ? 'check circle' : 'circle outline' } size="big" color="green"/>
                </Transition>
            </React.Fragment>
        );
    }
    /* 
    SELECT * FROM studenten where
    name='Xenokrates' or
    name='Jonas' or
    name='Schopenhauer' or
    name='Carnap' or
    name='Theophrastos' or
    name='Feuerbach' or
    name='Matthias Derp'
    */
    render() {
        if (this.state.initialized) {
            return (
                <Grid divided="vertically" id="exerciseGrid">
                    <Grid.Row>
                        <Grid.Column>
                            <MarkdownRenderer text={ "# " + this.state.title + "\n\n" + this.state.description } />
                        </Grid.Column>
                    </Grid.Row>
                    { this.props.type != "spielwiese" ?
                        <Grid.Row>
                            <Grid.Column>
                                { this.solutionIndicator() }
                            </Grid.Column>
                        </Grid.Row>
                        : null }
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