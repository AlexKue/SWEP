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
            queryPanes: []
        }
    }
    
    componentDidMount() {
        this.setState({
            initialized: true
        });
    }

    render() {
        if (this.state.initialized) {
            return (
                <Tab menu={{
                    fluid: true,
                    vertical: true
                }}
                panes={this.state.queryPanes} />
            );
        } else {
            return <Loader active inline="centered">Lade Queries...</Loader>
        }
    }
}

export default CRUDQueryView;