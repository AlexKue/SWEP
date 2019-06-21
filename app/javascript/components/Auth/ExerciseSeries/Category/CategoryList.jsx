import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Icon
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable, { ThreeColumnTableRow } from '../../Components/ThreeColumnTable.jsx';


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
            solvedExerciseCount={ category.solvedExerciseCount }
            totalExerciseCount={ category.totalExerciseCount }
            categoryId={ category.id} 
            key={ "usl" + category.id }/>);
        
        return (
            <ThreeColumnTable title="Übungsserien">
                { categoryListItems }
            </ThreeColumnTable>
        );
    }
}

class CategoryListItem extends React.Component {

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

export default CategoryList;