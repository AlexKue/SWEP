import React, { useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
    Form,
    Input,
    Segment,
    Button,
    Message
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';
import API from '../../../API/API.jsx';

const CRUDCategoryView = (props) => {
    const context = useContext(AuthedContext);

    return <CRUDCategoryViewComponent context={context} {...props} />
}

class CRUDCategoryViewComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            id: props.id,
            requestPending: false,
            context: props.context,
            error: false,
            success: false,
            showMessage: false,
            messageTitle: "",
            messageContent: ""
        }

        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.crudCategory = this.crudCategory.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.toggleSubmitButton = this.toggleSubmitButton.bind(this);
    }

    updateTitle(event) {
        this.setState({
            title: event.target.value
        });
    }
    updateDescription(event) {
        this.setState({
            description: event.target.value
        });
    }
    crudCategory() {
        this.setState({
            requestPending: true
        });
        if (this.state.id) {    // Component was opened for edit
            // TODO: Update
        } else {
            API.createCategory(this.state.title, this.state.description)
            .then(response => {
                this.state.context.addCategory(
                    this.state.title,
                    this.state.description,
                    0,
                    0,
                    response.data.id,
                    null
                );
                this.setState({
                    success: true,
                    error: false,
                    messageTitle: "Erfolg",
                    messageContent: "Die Übungsserie wurde erfolgreich erstellt."
                })
            }).catch(error => {
                this.setState({
                    success: false,
                    error: true,
                    messageTitle: "Fehler",
                    messageContent: "Titel oder Beschreibung dürfen nicht leer sein / nicht nur aus Leerzeichen bestehen."
                })
            }).finally(() => {
                this.setState({
                    requestPending: false,
                    showMessage: true
                })
            })
        }
    }
    hideMessage() {
        this.setState({
            error: false,
            success: false
        })
    }
    toggleSubmitButton() {
        return (this.state.title == "" && this.state.description == "");
    }

    render() {
        return (
            <Segment>
                <Form
                    error={ this.state.error }
                    success={ this.state.success }>
                    <Form.Field>
                        <label>Titel</label>
                        <Input 
                            placeholder="Titel" 
                            content={ this.state.title }
                            onChange={ this.updateTitle }
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Beschreibung</label>
                        <TextareaAutosize
                            placeholder="Beschreibung"
                            value={ this.state.description } 
                            onChange={ this.updateDescription }
                            />
                    </Form.Field>
                    <Button 
                        type="submit"
                        content="Abschicken"
                        onClick={ this.crudCategory }
                        loading={ this.state.requestPending }
                        disabled={ this.toggleSubmitButton() }
                        primary
                        />
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

export default CRUDCategoryView;