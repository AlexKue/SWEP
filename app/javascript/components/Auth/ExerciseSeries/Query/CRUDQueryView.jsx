import React, { useContext } from "react";
import {
    Loader,
    Tab,
    Button,
    Grid,
    Message
} from "semantic-ui-react";
import CodeMirror from "react-codemirror";
require("codemirror/mode/sql/sql");

import AuthedContext from '../../AuthedContext.jsx';
import API from '../../../API/API.jsx';

const CRUDQueryView = (props) => {
    const context = useContext(AuthedContext);

    return <CRUDQueryViewComponent context={context} exerciseId={props.exerciseId} />
}

class CRUDQueryViewComponent extends React.Component {

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
            initialized: false,
            queryPanes: [],
            codeMirrorOptions: {
                lineNumbers: true,
                mode: "sql"
            },
            queryPanes: [],
            localQueryMap: new Map(),
            activeIndex: 0,
            exerciseId: props.exerciseId,
            messageTitle: "",
            messageContent: "",
            successMessage: true,
            showMessage: false,
            loading: false,
            context: props.context
        }
    }

    async componentDidMount() {
        setTimeout(async () => {  // Timeout to ensure showing circle
            for (const queryId of this.state.context.getExerciseById(this.props.exerciseId).queryIdSet) {
                if (this.state.context.getQuery(queryId)) {
                    this.state.localQueryMap.set(queryId, this.state.context.getQuery(queryId));
                } else {
                    // Fetch query, put in context and local
                    let queryPromiseResult = await API.getQuery(queryId);
                    let queryResult = queryPromiseResult.data;
                    // TODO: If error (shouldn't happen)
                    this.state.localQueryMap.set(queryResult.id, queryResult.query);
                    this.state.context.addQuery(queryResult.id, queryResult.query);
                }
            }
            this.updatePanes();
            this.setState({
                initialized: true
            });
        }, 50);
    }

    handleTabChange = (event, data) => {
        let newActiveIndex = data.activeIndex;
        if (newActiveIndex == this.state.queryPanes.length && !this.state.localQueryMap.has(Number.MAX_SAFE_INTEGER)) {
            // Clicked last element
            // and there's no untracked element at the moment
            this.state.localQueryMap.set(Number.MAX_SAFE_INTEGER, "INSERT INTO Here VALUES('QUERY')");
            this.updatePanes();
        }
        this.setState({
            activeIndex: data.activeIndex,
            showMessage: false
        });
    }

    updatePanes = () => {
        let panes = [];
        let i = 1;
        let sortedByIdQueries = new Map([...this.state.localQueryMap.entries()].sort());
        for (const [queryId, value] of sortedByIdQueries) {
            panes.push({
                menuItem: "Query " + i,
                render: () => {
                    return (
                    <Tab.Pane key={queryId}>
                        <CodeMirror
                            options={ this.state.codeMirrorOptions }
                            value={ this.state.localQueryMap.get(queryId) } 
                            onChange={ (content) => this.updateLocalQuery(queryId, content)}/>
                        { this.state.showMessage ? this.state.successMessage ? 
                            <Message
                                header={ this.state.messageTitle }
                                content={ this.state.messageContent }
                                onDismiss={ this.hideMessage }
                                positive />
                            : 
                            <Message
                                header={ this.state.messageTitle }
                                content={ this.state.messageContent }
                                onDismiss={ this.hideMessage }
                                negative />
                        : null }
                        
                        <Grid columns={2}>
                            <Grid.Column>
                                <Button content="Abschicken" onClick={ () => this.crudQuery(queryId) }/>
                            </Grid.Column>
                            <Grid.Column>
                                <Button color="red" content="Löschen" style={{float: "right"}} onClick={ () => this.deleteQuery(queryId) } disabled/>
                            </Grid.Column>
                        </Grid>
                    </Tab.Pane>
                    )
                }
            })
            i++;
        }
        this.setState({
            queryPanes: panes
        })
    }

    updateLocalQuery = (queryId, value) => {
        this.state.localQueryMap.set(queryId, value);
    }

    crudQuery = (queryId) => {
        if (queryId == Number.MAX_SAFE_INTEGER) { // this is the not-yet-tracked query
            API.createQuery(this.state.exerciseId, this.state.localQueryMap.get(queryId))
            .then(response => {
                let newQueryId = response.data.id;
                // Add Query to Context
                this.state.context.addQuery(newQueryId, this.state.localQueryMap.get(queryId));
                // Link Query with exercise
                this.state.context.getExerciseById(this.state.exerciseId).addQuery(newQueryId);
                this.state.localQueryMap.set(newQueryId, this.state.localQueryMap.get(queryId));
                this.state.localQueryMap.delete(Number.MAX_SAFE_INTEGER);
                this.setState({
                    messageTitle: "Erfolg",
                    messageContent: "Die Query wurde erfolgreich hinzugefügt.",
                    showMessage: true,
                    successMessage: true
                });
            }).catch(error => {
                this.setState({
                    messageTitle: "Fehler",
                    messageContent: error,
                    showMessage: true,
                    successMessage: false
                })
            }).finally(() => {
                this.updatePanes();
                this.setState({
                    loading: false
                })
            })
        } else { // This query is tracked, so less work
            API.updateQuery(queryId, this.state.localQueryMap.get(queryId))
            .then(response => {
                this.state.context.updateQuery(queryId, this.state.localQueryMap.get(queryId));
                this.setState({
                    messageTitle: "Erfolg",
                    messageContent: "Änderungen erfolgreich übernommen.",
                    showMessage: true,
                    successMessage: true
                })
            }).catch(error => {
                this.setState({
                    messageTitle: "Fehler",
                    messageContent: error,
                    showMessage: true,
                    successMessage: false
                })
            }).finally(() => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    deleteQuery = (queryId) => {
        // TODO
    }

    hideMessage = () => {
        this.setState({
            showMessage: false
        });
    }
    render() {
        if (this.state.initialized) {
            return (
                <Tab menu={{
                    fluid: true,
                    vertical: true
                }}
                panes={this.state.queryPanes.concat(this.addQueryButton)} 
                onTabChange={ this.handleTabChange }
                activeIndex={ this.state.activeIndex }/>
            );
        } else {
            return <Loader active inline="centered">Lade Queries...</Loader>
        }
    }
}

export default CRUDQueryView;