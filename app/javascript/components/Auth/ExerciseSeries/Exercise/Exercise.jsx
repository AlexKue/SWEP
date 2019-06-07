import React from "react";
import {
    Grid,
    Form,
    Header
} from "semantic-ui-react";
import Textarea  from "react-textarea-autosize";

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            description: props.description,
            storedQuery: props.query
        }

        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(event) {
        this.setState({
            storedQuery: event.target.value
        });
    }

    render() {
        return (
            <Grid divided="vertically" id="exerciseGrid">
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" dividing>{ this.state.title }</Header>
                        <p>{ this.state.description }</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Textarea 
                                value={ this.state.storedQuery }
                                onChange={ this.updateQuery }/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}