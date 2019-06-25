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
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            initialized: true
        });
    }

    handleTabChange = (event, data) => {
        let newActiveIndex = data.activeIndex;
        if (newActiveIndex == this.state.queryPanes.length && !this.state.localQueryMap.has(-1)) {
            // Clicked last element
            // and there's no untracked element at the moment
            this.state.localQueryMap.set(-1, "INSERT INTO Here VALUES('QUERY')");
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
        for (const [queryId, value] of this.state.localQueryMap) {
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
                                positive />
                            : 
                            <Message
                                header={ this.state.messageTitle }
                                content={ this.state.messageContent }
                                negative />
                        : null }
                        
                        <Grid columns={2}>
                            <Grid.Column>
                                <Button content="Abschicken" onClick={ () => this.crudQuery(queryId) }/>
                            </Grid.Column>
                            <Grid.Column>
                                <Button color="red" content="Löschen" style={{float: "right"}} onClick={ () => this.deleteQuery(queryId) }/>
                            </Grid.Column>
                        </Grid>
                    </Tab.Pane>
                    )
                }
            })
        }
        this.setState({
            queryPanes: panes
        })
    }

    updateLocalQuery = (queryId, value) => {
        this.state.localQueryMap.set(queryId, value);
    }

    crudQuery = (queryId) => {
        if (queryId == -1) { // this is the not-yet-tracked query
            API.createQuery(this.state.exerciseId, this.state.localQueryMap.get(queryId))
            .then(response => {
                // TODO: Add to local storage (context)
                // TODO: Update ID
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