import React, { useContext } from "react";
import {
    Form,
    Segment,
    Grid,
    Message
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
            oldUserNick: localStorage.getItem("userName"),
            newUserNick: localStorage.getItem("userName"),
            oldUserMail: localStorage.getItem("userMail"),
            newUserMail: localStorage.getItem("userMail"),
            oldUserPass: "",                                    // need to provide for security
            newUserPass: "",
            newUserPassConf: "",
            oldShowInLeaderboard: false,     // TODO: Update when received from server
            newShowInLeaderboard: false,    // TODO: Update when received from server
            deleteUserTitle: "Account löschen",
            changed: false,
            loading: false,
            messageTitle: "",
            messageContent: "",
            success: false,
            error: false
        }

        this.updateUserNick = this.updateUserNick.bind(this);
        this.updateUserMail = this.updateUserMail.bind(this);
        this.updateUserPass = this.updateUserPass.bind(this);
        this.updateUserPassConf = this.updateUserPassConf.bind(this);
        this.updateShowInLeaderboard = this.updateShowInLeaderboard.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.resetDeleteButton = this.resetDeleteButton.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    updateUserNick(event) {
        this.setState({
            newUserNick: event.target.value,
            changed: true
        });
    }
    updateUserMail(event) {
        this.setState({
            newUserMail: event.target.value,
            changed: true
        });
    }
    updateUserPass(event) {
        this.setState({
            newUserPass: event.target.value,
            changed: true
        });
    }
    updateUserPassConf(event) {
        this.setState({
            newUserPassConf: event.target.value,
            changed: true
        });
    }
    updateShowInLeaderboard() {
        this.setState((prevState) => ({ 
            newShowInLeaderboard: !prevState.newShowInLeaderboard,
            changed: true
        }));
    }
    saveSettings() {
        this.setState({
            loading: true
        });
        // TODO: Make a real call
        let state = this.state;
        API.updateUser(localStorage.getItem("userId"),
            state.oldUserPass,
            state.newUserNick != state.oldUserNick ? state.newUserNick : null,
            state.newUserMail != state.oldUserMail ? state.newUserMail : null,
            state.newShowInLeaderboard != state.oldShowInLeaderboard ? state.newShowInLeaderboard : null,
            state.newUserPass != "" ? state.newUserPass : null,
            state.newUserPassConf != "" ? state.newUserPassConf : null)
        .then(response => {
            this.setState({
                success: true,
                error: false,
                messageTitle: "Erfolg",
                messageContent: "Einstellungen erfolgreich geändert.",
                loading: false
            })
        }).catch(error => {
            this.setState({
                success: false,
                error: true,
                messageTitle: "Fehler",
                messageContent: error
            });
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
    hideMessage() {
        this.setState({
            success: false,
            error: false
        });
    }

    render() {
        return (
            <Segment>
                <Form
                    error={ this.state.error }
                    success={ this.state.success }>
                    <Form.Input
                        label="Nickname"
                        value={ this.state.newUserNick }
                        onChange={ this.updateUserNick } />
                    <Form.Input
                        label="E-Mail Adresse"
                        value={ this.state.newUserMail }
                        onChange={ this.updateUserMail } />
                    <Form.Input
                        label="Passwort"
                        value={ this.state.newUserPass }
                        onChange={ this.updateUserPass } 
                        type="password" />
                    <Form.Input
                        value={ this.state.newUserPassConf }
                        onChange={ this.updateUserPassConf } 
                        placeholder="Passwort wiederholen"
                        type="password" />
                    <Form.Checkbox
                        label="In Rangliste anzeigen?"
                        checked={ this.state.newShowInLeaderboard }
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
                </Form>
            </Segment>
        )
    }
}

export default UserSettings;