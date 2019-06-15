import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Table,
    Icon
} from "semantic-ui-react";

class CategoryListItem extends React.Component {
    constructor(props) {
        super(props);

        this.props.admin ? 
        this.state = {
            linkText: "Erstellen"
        } : 
        this.state = {
            linkText: "Gehe zu"
        };
    }

    // Edit & Delete Button will show in the category itself
    render() {
        return (
            <Table.Row>
                <Table.Cell>{ this.props.title }</Table.Cell>
                <Table.Cell collapsing textAlign="right">{this.props.solvedExerciseCount + "/" + this.props.totalExerciseCount}</Table.Cell>
                <Table.Cell collapsing><Link to={"/" + this.props.categoryId }>Gehe zu <Icon name="arrow right" /></Link></Table.Cell>
            </Table.Row>
        );
    }
}

export default withRouter(CategoryListItem);