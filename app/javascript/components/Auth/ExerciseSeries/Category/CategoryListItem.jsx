import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Menu
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
            <Menu>
                <Menu.Item className="categoryListItemTitle">{ this.props.title }</Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item className="categoryListItemSolved">
                        <div className="categoryListItemSolvedCenterDiv">
                            { this.props.solvedExerciseCount } / { this.props.totalExerciseCount }
                        </div>
                    </Menu.Item>
                    <Menu.Item as={Link} to={"/" + this.props.categoryId }>{ this.state.linkText }</Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default withRouter(CategoryListItem);