import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Container,
    Loader
} from "semantic-ui-react";

import CategoryListItem from "./CategoryListItem.jsx";
import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable from '../../Components/ThreeColumnTable.jsx';


const CategoryList = (props) => {
    /*
        Hooks are only working with React function components, that's why we
        cannot use a class component.
    */
    const context = useContext(AuthedContext);

    return (
        <Container>
            <CategoryRender categories={ context.getCategories() }/>
        </Container>
    );
}

class CategoryRender extends React.Component {
    render() {
        let categoryListItems = 
        [...this.props.categories].map(([id, category]) => 
        <CategoryListItem
            title={ category.title}
            description={ category.description }
            solvedExerciseCount={ category.solvedExerciseCount }
            totalExerciseCount={ category.totalExerciseCount }
            categoryId={ category.id} 
            key={ "us" + category.id }/>);

        // Add AdminItem if userRole is admin
        categoryListItems.push(
            window._userRole === "admin" ?
            <CategoryListItem
                title="Übungsserie erstellen"
                description=""
                solvedExerciseCount="42"
                totalExerciseCount="42"
                categoryId="createseries"
                admin={true}
                key="admin"
                />
        : null);
        
        return (
            <ThreeColumnTable title="Übungsserien">
                { categoryListItems }
            </ThreeColumnTable>
        );
    }
}

export default CategoryList;