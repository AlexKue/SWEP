import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Icon
} from "semantic-ui-react";

import { ThreeColumnTableRow } from '../../Components/ThreeColumnTable.jsx';

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
            <ThreeColumnTableRow
                firstContent={ this.props.title }
                secondContent={ this.props.solvedExerciseCount + "/" + this.props.totalExerciseCount}
                thirdContent={<Link to={"/category-" + this.props.categoryId }>Gehe zu <Icon name="arrow right" /></Link>}
            />
        );
    }
}

export default withRouter(CategoryListItem);