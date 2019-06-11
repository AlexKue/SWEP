import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Container
} from "semantic-ui-react";

import CategoryListItem from "./CategoryListItem.jsx";


class CategoryList extends React.Component {
    /* 
        CategoryList will render a List of all Categories
        If there's no Category AND the user is admin, they'll see the
        option to create a new Category
    */
    render() {
        return (
            <Container>
                <CategoryListItem title="Testtitel" solvedExerciseCount="7" totalExerciseCount="31" categoryLink="test123"/> 
                <CategoryListItem title="Testtitel" solvedExerciseCount="19" totalExerciseCount="96" /> 
                <CategoryListItem title="Testtitel" solvedExerciseCount="5" totalExerciseCount="7" /> 
            </Container>
        );
    }
}

export default withRouter(CategoryList);