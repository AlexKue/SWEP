import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Menu
} from "semantic-ui-react";

class CategoryListItem extends React.Component {
    // TODO: Create Function to render depending on admin or not
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
                    <Menu.Item as={Link} to={ this.props.categoryLink }>Gehe zu</Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default withRouter(CategoryListItem);