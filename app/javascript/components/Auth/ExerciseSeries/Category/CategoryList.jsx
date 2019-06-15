import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Container
} from "semantic-ui-react";

import CategoryListItem from "./CategoryListItem.jsx";
import { ExerciseSeriesContext } from '../ExerciseSeriesContext.jsx';


const CategoryList = (props) => {
    /*
        Hooks are only working with React function components, that's why we
        cannot use a class component.
    */
    const context = useContext(ExerciseSeriesContext);
    context.getCategories();

    return (
        <Container>
            <CategoryRender categories={ context.categories }/>
        </Container>
    );
}

class CategoryRender extends React.Component {
    render() {
        const categoryMenuItems = this.props.categories ? this.props.categories.map((category) =>
           <CategoryListItem
                title={ category.title}
                description={ category.description }
                solvedExerciseCount={ category.solvedExerciseCount }
                totalExerciseCount={ category.totalExerciseCount }
                categoryId={ category.id} 
                key={ "us" + category.id }/>
        ) : null;
        return (
            <React.Fragment>
                { categoryMenuItems }
            </React.Fragment>
        );
    }
}

export default CategoryList;