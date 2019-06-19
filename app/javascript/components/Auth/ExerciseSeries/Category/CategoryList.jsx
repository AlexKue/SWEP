import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Button
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
        <React.Fragment>
            <CategoryRender categories={ context.getCategories() }/>
            { window._userRole === "admin" ?
                <Button 
                    as={ Link }
                    to="/category/create"
                    content="Übungsserie erstellen"
                    icon="add"
                    labelPosition="left"
                    />
            : null}
        </React.Fragment>
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
        
        return (
            <ThreeColumnTable title="Übungsserien">
                { categoryListItems }
            </ThreeColumnTable>
        );
    }
}

export default CategoryList;