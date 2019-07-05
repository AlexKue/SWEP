import React, { useContext } from "react"
import {
    Tab,
    Loader,
    Segment,
    List,
    Button
} from "semantic-ui-react"
import {UnControlled as CodeMirror} from "react-codemirror2";
require('codemirror/mode/sql/sql');

import API from '../../../API/API.jsx';
import AuthedContext from '../../AuthedContext.jsx';

const UncertainQueryView = (props) => {
    let context = useContext(AuthedContext);

    return <UncertainQueryViewComponent context={ context } {...props} />;
}

class UncertainQueryViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            context: props.context,
            initialized: false,
            panes: []
        }
    }

    componentDidMount() {
        API.getUncertainSolutionList()
        .then(response => {
            let exerciseIdList = response.data.exercises.sort(intComparator);
            let panes = [];
            for (let exerciseId of exerciseIdList) {
                panes.push({
                    menuItem: this.state.context.getExerciseById(exerciseId).title,
                    render: () => {
                        return (
                            <Tab.Pane>
                                <UncertainQueryViewTabComponent key={ "ucqvtc_" + exerciseId }exerciseId={ exerciseId } context={ this.state.context }/>
                            </Tab.Pane>
                        );
                    }
                });
            }
            this.setState({ panes: panes });
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            this.setState({ initialized: true });
        })
    }

    render() {
        if (!this.state.initialized) {
            return <Loader active inline="centered">Lade Aufgaben mit unsicheren Queries...</Loader> 
        } else {
            return <Tab menu={{fluid: true, vertical: true}} panes={ this.state.panes } />
        }
    }
}

class UncertainQueryViewTabComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            initialized: false,
            context: props.context,
            exerciseId: props.exerciseId,
            queryList: []
        }
    }

    componentDidMount() {
        let exerciseId = this.state.exerciseId;
        if (!this.state.context.isExerciseInitialized(exerciseId)) {
            this.state.context.fetchExerciseInformation(exerciseId)
            .then(response => {
                this.initializeQueries(exerciseId);
            }).catch(error => {
                console.error(error);
            }).finally({

            });
        } else {
            this.initializeQueries(exerciseId);
        }
    }

    initializeQueries = (exerciseId) => {
        API.getUncertainSolutionListForExercise(exerciseId)
        .then(response => {
            let queryObjectArray = response.data;
            let queryList = queryObjectArray.map(queryObject => {
                return <UncertainQueryListItem 
                            key={"uqli_" + exerciseId + "_" + queryObject.user_id} 
                            exerciseId={ exerciseId }
                            userId={ queryObject.user_id }
                            studentQuery={ queryObject.student_query } />
            });
            this.setState({
                queryList: queryList
            });
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            this.setState({ initialized: true });
        });
    }

    render() {
        if(!this.state.initialized) {
            return <Loader active inline="centered">Lade Queries...</Loader>
        } else {
            return (
                <React.Fragment>
                    <Segment>{ this.state.context.getExerciseById(this.state.exerciseId).description }</Segment>
                    <List divided items={ this.state.queryList } />
                </React.Fragment>
            );
        }
    }
}

class UncertainQueryListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseId: props.exerciseId,
            userId: props.userId,
            studentQuery: props.studentQuery,
            loading: false
        }
    }

    setSolved = (solved) => {
        this.setState({ loading: true });
        API.updateUncertainSolution(this.state.userId, this.state.exerciseId, solved)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            this.setState({ loading: false });
        })
    }
    render() {
        return (
            <List.Item key={"uqlicomponent_" + this.state.exerciseId + "_" + this.state.userId}>
                <CodeMirror
                    options={{lineNumbers: true, readOnly: true, mode: "sql"}}
                    value={ this.state.studentQuery } />
                <Button.Group>
                    <Button onClick={ () => { this.setSolved(true) }} positive loading={ this.state.loading } disabled={ this.state.loading }>Korrekt</Button>
                    <Button.Or text='/'/>
                    <Button onClick={ () => { this.setSolved(false) }} negative loading={ this.state.loading } disabled={ this.state.loading }>Inkorrekt</Button>
                </Button.Group>
            </List.Item>
        );
    }
}

const intComparator = (a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
}

export default UncertainQueryView;