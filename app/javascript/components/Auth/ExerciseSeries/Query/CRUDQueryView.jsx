import React, { useContext } from "react";
import {
    Loader,
    Tab,
    Button,
    Grid
} from "semantic-ui-react";
import CodeMirror from "react-codemirror";
require("codemirror/mode/sql/sql");

import AuthedContext from '../../AuthedContext.jsx';

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
            activeIndex: 0
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
            activeIndex: data.activeIndex
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
        // TODO
    }

    deleteQuery = (queryId) => {
        // TODO
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