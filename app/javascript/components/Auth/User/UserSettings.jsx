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

        let context = props.context;

        this.state = {
            oldUserNick: context.getUserName(),
            newUserNick: context.getUserName(),
            oldUserMail: context.getUserMail(),
            newUserMail: context.getUserMail(),
            oldUserPass: "",                                    // need to provide for security
            newUserPass: "",
            newUserPassConf: "",
            oldHideInRanking: context.getHideInRanking(),
            newHideInRanking: context.getHideInRanking(),
            deleteUserTitle: "Account löschen",
            changed: false,
            loading: false,
            messageTitle: "",
            messageContent: "",
            success: false,
            error: false,
            context: context
        }

        console.log(context.getHideInRanking());

        this.updateUserNick = this.updateUserNick.bind(this);
        this.updateUserMail = this.updateUserMail.bind(this);
        this.updateUserPass = this.updateUserPass.bind(this);
        this.updateUserPassConf = this.updateUserPassConf.bind(this);
        this.updateHideInRanking = this.updateHideInRanking.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.resetDeleteButton = this.resetDeleteButton.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.updateOldUserPass = this.updateOldUserPass.bind(this);
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
    updateHideInRanking() {
        this.setState((prevState) => ({ 
            newHideInRanking: !prevState.newHideInRanking,
            changed: true
        }));
    }
    updateOldUserPass(event) {
        this.setState({
            oldUserPass: event.target.value
        });
    }
    saveSettings() {
        this.setState({
            loading: true
        });
        let state = this.state;
        API.updateUser(state.context.getUserId(),
            state.oldUserPass,
            state.newUserNick != state.oldUserNick ? state.newUserNick : null,
            state.newUserMail != state.oldUserMail ? state.newUserMail : null,
            state.newHideInRanking != state.oldHideInRanking ? state.newHideInRanking : null,
            state.newUserPass != "" ? state.newUserPass : null,
            state.newUserPassConf != "" ? state.newUserPassConf : null)
        .then(response => {
            state.context.setUserName(state.newUserNick);
            state.context.setHideInRanking(state.newHideInRanking);
            this.setState((prevState) => ({
                success: true,
                error: false,
                messageTitle: "Erfolg",
                messageContent: "Einstellungen erfolgreich geändert.",
                oldUserNick: prevState.newUserNick,
                oldUserMail: prevState.newUserMail,
                oldHideInRanking: prevState.newHideInRanking
            }));
        }).catch(error => {
            this.setState({
                success: false,
                error: true,
                messageTitle: "Fehler",
                messageContent: error
            });
        }).finally(() => {
            this.setState({
                loading: false
            })
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
            API.deleteUser(this.state.getUserId())
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
                        onChange={ this.updateUserNick }
                        icon="user"
                        iconPosition="left" />
                    <Form.Input
                        label="E-Mail Adresse"
                        value={ this.state.newUserMail }
                        onChange={ this.updateUserMail } 
                        icon="at"
                        iconPosition="left" />
                    <Form.Input
                        label="Altes Passwort"
                        value={ this.state.oldUserPass }
                        onChange={ this.updateOldUserPass } 
                        type="password"
                        placeholder="Altes Passwort" 
                        icon="key"
                        iconPosition="left"/>
                    <Form.Input
                        label="Neues Passwort"
                        value={ this.state.newUserPass }
                        onChange={ this.updateUserPass } 
                        placeholder="Neues Passwort wiederholen"
                        type="password"  
                        icon="key"
                        iconPosition="left"/>
                    <Form.Input
                        value={ this.state.newUserPassConf }
                        onChange={ this.updateUserPassConf } 
                        placeholder="Passwort wiederholen"
                        type="password"  
                        icon="key"
                        iconPosition="left"/>
                    <Form.Checkbox
                        label="In Rangliste verstecken?"
                        checked={ this.state.newHideInRanking }
                        onChange={ this.updateHideInRanking }
                        toggle />
                    <Grid columns={2}>
                        <Grid.Column>
                            { this.state.changed ? 
                                <Form.Button
                                    content="Änderungen übernehmen"
                                    onClick={ this.saveSettings }
                                    loading={ this.state.loading }
                                    disabled={ this.state.loading }
                                    type="submit"
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
                                style={{float: "right"}}
                                type="reset"/>  {/* Make reset to prevent default RETURN behaviour */}
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