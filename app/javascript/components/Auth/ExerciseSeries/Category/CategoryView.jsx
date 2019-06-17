import React, { useContext } from "react";
import { __RouterContext } from "react-router-dom";

import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable from '../../Components/ThreeColumnTable.jsx';

export const CategoryView = (props) => {    // props is containing the Router context
    let context = useContext(AuthedContext);
    let categoryId = parseInt(props.match.params.id);
    let category = context.getCategories().get(categoryId);

    return <CategoryViewComponent
                title={ category.title }
                description={ category.description }
                {...props} />
}

class CategoryViewComponent extends React.Component {
    
    render() {
        return (
            <ThreeColumnTable
                withDescription={true}
                title={this.props.title}
                description={this.props.description} />
        );
    }
}