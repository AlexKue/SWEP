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

    return (
        <React.Fragment>
            <h1>{ context.text }</h1>
            <button onClick={context.updateText}>Click me</button>
        </React.Fragment>
    );
}

export default CategoryList;