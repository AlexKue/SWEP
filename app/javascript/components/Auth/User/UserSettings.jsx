import React, { useContext } from "react";
import {
    Form,
    Segment,
    Grid
} from "semantic-ui-react"

import AuthedContext from '../AuthedContext.jsx';
import API from '../../API/API.jsx';

const UserSettings = (props) => {
    let context = useContext(AuthedContext);

    return <UserSettingsComponent context={context} {...props} />
}

class UserSettingsComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            userNick: localStorage.getItem("userName"),
            userMail: localStorage.getItem("userMail"),
            userPass: "1234",
            userPassConf: "",
            showInLeaderbord: false, //TODO: Update when received from server
            changed: false,
            deleteUserTitle: "Account löschen",
            loading: false
        }

        this.updateUserNick = this.updateUserNick.bind(this);
        this.updateUserMail = this.updateUserMail.bind(this);
        this.updateUserPass = this.updateUserPass.bind(this);
        this.updateUserPassConf = this.updateUserPassConf.bind(this);
        this.updateShowInLeaderboard = this.updateShowInLeaderboard.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.resetDeleteButton = this.resetDeleteButton.bind(this)
    }

    updateUserNick(event) {
        this.setState({
            userNick: event.target.value,
            changed: true
        });
    }
    updateUserMail(event) {
        this.setState({
            userMail: event.target.value,
            changed: true
        });
    }
    updateUserPass(event) {
        this.setState({
            userPass: event.target.value,
            changed: true
        });
    }
    updateUserPassConf(event) {
        this.setState({
            userPassConf: event.target.value,
            changed: true
        });
    }
    updateShowInLeaderboard(event) {
        this.setState({
            showInLeaderbord: event.target.value,
            changed: true
        });
    }
    saveSettings() {
        // TODO
        this.setState({
            loading: true
        });
    }
    deleteUser() {
        if (this.state.deleteUserTitle === "Account löschen") {
            this.setState({
                deleteUserTitle: "Wirklich löschen?"
            });
        } else {
            this.setState({
                loading: true
            });
            API.deleteUser(localStorage.getItem("userId"))
            .then(response => {
                this.props.context.setUserLoggedOut();
            }).catch(error => {
                console.log(error); // Shouldn't happen
                this.setState({ 
                    loading: false 
                });
            });
        }
    }
    resetDeleteButton() {
        this.setState({
            deleteUserTitle: "Account löschen"
        })
    }

    render() {
        return (
            <Segment>
                <Form>
                    <Form.Input
                        label="Nickname"
                        value={ this.state.userNick }
                        onChange={ this.updateUserNick } />
                    <Form.Input
                        label="E-Mail Adresse"
                        value={ this.state.userMail }
                        onChange={ this.updateUserMail } />
                    <Form.Input
                        label="Passwort"
                        value={ this.state.userPass }
                        onChange={ this.updateUserPass } 
                        type="password" />
                    <Form.Input
                        value={ this.state.userPassConf }
                        onChange={ this.updateUserPassConf } 
                        placeholder="Passwort wiederholen"
                        type="password" />
                    <Form.Checkbox
                        label="In Rangliste anzeigen?"
                        checked={ this.state.showInLeaderbord }
                        onChange={ this.updateShowInLeaderboard }
                        toggle />
                    <Grid columns={2}>
                        <Grid.Column>
                            { this.state.changed ? 
                                <Form.Button
                                    content="Änderungen übernehmen"
                                    onClick={ this.saveSettings }
                                    loading={ this.state.loading }
                                    disabled={ this.state.loading }
                                    primary />
                            : null }
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Button
                                content={ this.state.deleteUserTitle }
                                onClick={ this.deleteUser }
                                onBlur={ this.resetDeleteButton }
                                color="red"
                                loading={ this.state.loading }
                                disabled={ this.state.loading }
                                style={{float: "right"}}/>
                        </Grid.Column>
                    </Grid>
                </Form>
            </Segment>
        )
    }
}

export default UserSettings;