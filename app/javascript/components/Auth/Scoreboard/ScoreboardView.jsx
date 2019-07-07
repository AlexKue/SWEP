import React, { useContext } from "react"
import {
    Table, Loader, Icon, Button, Segment, Header
} from "semantic-ui-react"

import AuthedContext from '../AuthedContext.jsx';
import API from "../../API/API.jsx";
import ThreeColumnTable, { ThreeColumnTableRow } from '../Components/ThreeColumnTable.jsx';

const ScoreboardView = (props) => {
    let context = useContext(AuthedContext);

    return <ScoreboardViewComponent context={context} {...props} />
}

class ScoreboardViewComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            context: props.context,
            initialized: false,
            loadingText: "Lade Scoreboard...",
            scoreboardEntries: []
        }
    }

    componentDidMount() {
        this.initialize(false);
    }

    initialize = (refresh) => {
        if (!this.state.initialized || refresh) {
            API.getScoreboard()
            .then(response => {
                let scoreboardDataArray = response.data;
                let scoreboardEntries = [];
                if (scoreboardDataArray.length > 0) {
                    for (let scoreboardEntry of scoreboardDataArray) {  
                        scoreboardEntries.push(
                            <Table.Row key={"scb_" + scoreboardEntry.rank }>
                                <Table.Cell collapsing textAlign="center">
                                    { scoreboardEntry.rank < 4 ? (
                                        scoreboardEntry.rank == 1 ? <Icon name="trophy" style={{color: "#FFD700"}} /> :
                                        scoreboardEntry.rank == 2 ? <Icon name="trophy" style={{color: "#C0C0C0"}} /> : 
                                        scoreboardEntry.rank == 3 ? <Icon name="trophy" style={{color: "#CD7F32"}} /> : null
                                        )
                                    : null}
                                    { scoreboardEntry.rank }
                                </Table.Cell>
                                <Table.Cell>{ scoreboardEntry.name }</Table.Cell>
                                <Table.Cell collapsing textAlign="center">{ scoreboardEntry.sum }</Table.Cell>
                            </Table.Row>
                        );
                    }
                    this.setState({scoreboardEntries: scoreboardEntries});
                }
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                if (refresh) this.setState({loading: false});
                else this.setState({initialized: true});
            });
        }
    }

    reload = () => {
        this.setState({loading: true, loadingText: ""});
        this.initialize(true);
    }

    render() {
        return (
            <Segment basic loading={ this.state.loading || !this.state.initialized }>
                <Header as="h2">
                    <Icon name="trophy" />
                    <Header.Content>
                        Rangliste
                        <Header.Subheader>In den Benutzereinstellungen kann festgelegt werden, ob man in der Rangliste angezeigt werden möchte.</Header.Subheader>
                    </Header.Content>
                </Header>
                    { this.state.scoreboardEntries.length > 0 ?
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell collapsing>Platz</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell collapsing textAlign="center">Punkte</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { this.state.scoreboardEntries }
                            </Table.Body>
                        </Table>
                        :
                        <p>Es gibt derzeit keine Einträge in der Rangliste.</p>
                    }
                <Button content="Aktualisieren" icon="refresh" labelPosition="left" color="green" onClick={ this.reload } />
            </Segment>
        );
    }
}

export default ScoreboardView;