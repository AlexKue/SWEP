import React, { useContext } from "react";
import { __RouterContext, Link } from "react-router-dom";
import {
    Button,
    Grid
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable from '../../Components/ThreeColumnTable.jsx';

export const CategoryView = (props) => {    // props is containing the Router context
    let context = useContext(AuthedContext);
    let categoryId = parseInt(props.match.params.categoryId);
    let category = context.getCategories().get(categoryId);

    return (
        <React.Fragment>
            <CategoryViewComponent
                    title={ category.title }
                    description={ category.description }
                    {...props} />
            { window._userRole === "admin" ?
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Button 
                            as={ Link }
                            to={"/category-" + categoryId + "/create-exercise"}
                            content="Aufgabe erstellen" 
                            icon="add"
                            labelPosition="left"
                            disabled />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            as={ Link }
                            to={"/category-" + categoryId + "/edit" }
                            content="Bearbeiten"
                            icon="edit"
                            labelPosition="right" 
                            style={{float: "right"}} />
                    </Grid.Column>
                </Grid>
                : null }
        </React.Fragment>
    )
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