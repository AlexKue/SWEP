import React, { useContext } from "react";
import { Divider, Form, Grid, Loader, Message, Segment } from "semantic-ui-react";

import API from '../../../API/API.jsx';
import AuthedContext from '../../AuthedContext.jsx';
import CRUDQueryView from '../Query/CRUDQueryView.jsx';
import MarkdownEditor from "../../Components/MarkdownEditor.jsx";
import { __403 } from '../../Components/errors.jsx';

const CRUDExerciseView = (props) => {

    const context = useContext(AuthedContext);
    
    if (!context.isUserAdmin()) {
        return <__403 />;
    }

    let exerciseId = parseInt(props.match.params.exerciseId);
    let categoryId = parseInt(props.match.params.categoryId);

    return <CRUDExerciseViewComponent key={"ede_" + exerciseId}
                context={context}
                exerciseId={exerciseId}
                categoryId={categoryId}
                {...props} />
}

export default CRUDExerciseView;

class CRUDExerciseViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            id: props.exerciseId ? parseInt(props.exerciseId) : null,                   // set null if this is a new exercise
            history: props.history,
            crudExerciseLoading: false,
            points: 1,
            error: false,
            success: false,
            messageTitle: "",
            messageContent: "",
            initialized: props.exerciseId ? false : true,    // It's initialized if it's new
            loaderText: "Lade Übung",
            context: props.context,
            deleteTitle: "Löschen"
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
    updateDescription = (value) => {
        this.setState({
            description: value
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
            API.updateExercise(this.state.id, this.state.title, this.state.description, this.state.points)
            .then(response => {
                this.state.context.updateExercise(this.state.id, this.state.title, this.state.description, this.state.points);
                this.setState({
                    error: false,
                    success: true,
                    messageTitle: "Erfolg",
                    messageContent: "Die Änderungen wurden erfolgreich übernommen."
                });
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
                })
            });
        } else { // Component has no ID => We need to create it
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
                });
            }).finally(() => {
                this.setState({
                    crudExerciseLoading: false
                });
            })
        }
    }
    hideMessage = () => {
        this.setState({
            error: false,
            success: false
        })
    }
    deleteExercise = () => {
        if (this.state.deleteTitle === "Löschen") {
            this.setState({
                deleteTitle: "Wirklich löschen?"
            });
        } else {
            this.setState({
                crudExerciseLoading: true
            });
            API.deleteExercise(this.state.id)
            .then(response => {
                this.state.context.removeExercise(this.state.id, this.props.categoryId);
                this.props.history.push("/category-" + this.props.categoryId);
            }).catch(error => {
                this.setState({
                    error: true,
                    success: false,
                    messageTitle: "Fehler",
                    messageContent: "Irgendwas ist schiefgelaufen...",
                    crudExerciseLoading: false
                })
            })
        }
    }

    showSuccessMessage = (title, content) => {
        this.setState({
            messageTitle: title,
            messageContent: content,
            success: true,
            error: false
        })
    }

    componentDidMount() {   // Start processing of query list data
        let exerciseId = this.props.exerciseId;
        if (!exerciseId) return; // No need to fetch anything if this is a new exercise
        if (!this.state.context.getExerciseById(exerciseId)) {
            // above means that there's no such exercise (otherwise it would've been pulled by initialization)
            this.props.history.push("/404");
            return;
        }
        if (this.state.context.isExerciseInitialized(exerciseId)) { // If the exercise is initialized
            let exercise = this.state.context.getExerciseById(exerciseId);
            this.setState({
                title: exercise.title,
                description: exercise.description,
                points: exercise.totalExercisePoints,
                initialized: true,                      
            });
        } else { // We have to fetch everything <=> Initialize this exercise; Queries will be fetched by CRUDQuery
            this.state.context.fetchExerciseInformation(exerciseId)
            .then(response => {
                let exercise = this.state.context.getExerciseById(exerciseId);
                this.setState({
                    title: exercise.title,
                    description: exercise.description,
                    points: exercise.totalExercisePoints
                });
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                this.setState({
                    initialized: true
                });
            });
        }
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
                        <Divider />
                        <Form.Field>
                            <label>Beschreibung</label>
                            <p>Achtung: Die Beschreibung erfolgt in Markdown. Zeilenumbrüche müssen deshalb <b>doppelt</b> gemacht werden.</p>
                            <MarkdownEditor
                                prefixRender={ "# " + this.state.title + "\n\n" }
                                source={ this.state.description }
                                onChange={ this.updateDescription } 
                                allowEditFromLine={2}/> {/* First line is 0*/}
                        </Form.Field>
                        <Divider />
                        <Form.Input
                            label="Punkte"
                            placeholder="1"
                            value={ this.state.points }
                            onChange={ this.updatePoints }
                            />
                        <Grid columns={2}>
                            <Grid.Column>
                                <Form.Button
                                    type="submit"
                                    content="Abschicken"
                                    onClick={ this.crudExercise } 
                                    disabled={ this.state.crudExerciseLoading }
                                    loading={ this.state.crudExerciseLoading }/>
                            </Grid.Column>
                            <Grid.Column>
                                {this.state.id ?    // we can only delete smth that is deleteable
                                    <Form.Button
                                        type="reset"
                                        color="red"
                                        content={ this.state.deleteTitle }
                                        onClick={ this.deleteExercise }
                                        disabled={ this.state.crudExerciseLoading }
                                        loading={ this.state.crudExerciseLoading } 
                                        style={{float: "right"}}/>
                                    : null }
                            </Grid.Column>
                        </Grid>
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
                                    <CRUDQueryView exerciseId={ this.state.id } showSuccessMessage={ this.showSuccessMessage }/>
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