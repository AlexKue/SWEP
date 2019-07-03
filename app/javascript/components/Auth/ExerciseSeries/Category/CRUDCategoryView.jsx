import React, { useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
    Form,
    Input,
    Segment,
    Button,
    Message,
    Icon,
    Grid
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';
import API from '../../../API/API.jsx';
import { __403 } from '../../Components/errors.jsx';

const CRUDCategoryView = (props) => {

    const context = useContext(AuthedContext);

    if (context.getUserRole() != "admin") {
        return < __403 />
    }


    let category = null;
    let categoryId = props.match.params.categoryId;

    if (categoryId) {
        category = context.getCategoryById(parseInt(categoryId));
    }

    if (!category && categoryId) { // It doesn't exist but the categoryId is delivered (=> edit)
        props.history.push("/404");
    } 

    return <CRUDCategoryViewComponent key={ "edc_" + categoryId }
        context={context}
        title={ category ? category.title : null}
        description={ category ? category.description : null } 
        id={ categoryId }
        {...props} />
}

class CRUDCategoryViewComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            id: props.id ? parseInt(props.id) : null,
            requestPending: false,
            context: props.context,
            history: props.history,
            error: false,
            success: false,
            showMessage: false,
            messageTitle: "",
            messageContent: "",
            deleteTitle: "Löschen"
        }

        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.crudCategory = this.crudCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.resetDeleteButton = this.resetDeleteButton.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.toggleSubmitButton = this.toggleSubmitButton.bind(this);
        this.setRequestPending = this.setRequestPending.bind(this);
        this.resetRequestPending = this.resetRequestPending.bind(this);
    }
    setRequestPending() {
        this.setState({
            requestPending: true
        });
    }

    resetRequestPending() {
        this.setState({
            requestPending: false,
            showMessage: true
        });
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
        this.setRequestPending();
        
        if (this.state.id) {    // Component was opened for edit
            API.updateCategory(this.state.id, this.state.title, this.state.description)
            .then(response => {
                this.state.context.updateCategory(this.state.id, this.state.title, this.state.description);
                this.setState({
                    success: true,
                    error: false,
                    messageTitle: "Erfolg",
                    messageContent: "Die Änderungen wurden erfolgreich übernommen."
                });
            }).catch(error => {
                this.setState({
                    success: false,
                    error: true,
                    messageTitle: "Fehler",
                    messageContent: error
                });
            }).finally(() => {
                this.resetRequestPending();
            })
        } else {    // Component needs to be created
            API.createCategory(this.state.title, this.state.description)
            .then(response => {
                this.state.context.addCategory(
                    this.state.title,
                    this.state.description,
                    0,
                    0,
                    response.data.id
                );
                this.setState({
                    id: response.data.id,
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
                    messageContent: error
                })
            }).finally(() => {
                this.resetRequestPending();
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
    deleteCategory() {
        if (this.state.deleteTitle === "Löschen") {
            this.setState({
                deleteTitle: "Wirklich löschen?"
            });
        } else {
            this.setRequestPending();
            API.deleteCategory(this.state.id)
            .then(response => {
                this.state.context.removeCategory(this.state.id);
                this.state.history.push("/");
            }).catch(error => {
                // TODO optional - In theory this shouldn't happen
                console.log("Error in deleting category");
            })
        }
    }
    resetDeleteButton() {
        this.setState({
            deleteTitle: "Löschen"
        })
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
                            value={ this.state.title }
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
                    <Grid columns={2}>
                        <Grid.Column>
                            <Button 
                                type="submit"
                                content="Abschicken"
                                onClick={ this.crudCategory }
                                loading={ this.state.requestPending }
                                disabled={ this.toggleSubmitButton() || this.state.requestPending }
                                primary
                                />
                        </Grid.Column>
                        <Grid.Column>
                            { this.state.id ?
                                <Button 
                                    color="red"
                                    onClick={ this.deleteCategory }
                                    onBlur={ this.resetDeleteButton }
                                    content={ this.state.deleteTitle }
                                    style={{float: "right"}}>
                                </Button>
                                : null }
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

export default CRUDCategoryView;