import React, { useContext } from "react";
import { __RouterContext, Link } from "react-router-dom";
import {
    Button,
    Grid,
    Icon
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable, { ThreeColumnTableRow } from '../../Components/ThreeColumnTable.jsx';

export const CategoryView = (props) => {    // props is containing the Router context
    let context = useContext(AuthedContext);
    let categoryId = parseInt(props.match.params.categoryId);
    let category = context.getCategories().get(categoryId);
    if (!category) {
        props.history.push("/");    // If the category doesn't exist return to root
        return null;
    }
    let exercises = category.exerciseMap;
    let localUrl = props.history.location.pathname;

    return (
        <React.Fragment>
            <CategoryViewComponent
                    title={ category.title }
                    description={ category.description }
                    exerciseIdSet={ category.exerciseIdSet }
                    localUrl={ localUrl }
                    context={ context }
                    {...props} />
            { window._userRole === "admin" ?
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Button 
                            as={ Link }
                            to={"/category-" + categoryId + "/create-exercise"}
                            content="Aufgabe erstellen" 
                            icon="add"
                            labelPosition="left" />
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
        let context = this.props.context;
        let exerciseListItems = 
        [...this.props.exerciseIdSet].map(exerciseId => {
            let exercise = context.getExerciseById(exerciseId);
            return <ExerciseListItem
                title={ exercise.title }
                totalExercisePoints={ exercise.totalExercisePoints }
                solved={ exercise.solved }
                exerciseId={ exercise.id }
                localUrl= { this.props.localUrl }
                key={ "excl" + exercise.id } />
            });
        return (
            <ThreeColumnTable
                withDescription={true}
                title={this.props.title}
                description={this.props.description}>
                    { exerciseListItems }
            </ThreeColumnTable>
        );
    }
}

class ExerciseListItem extends React.Component {

    render() {
        return (
            <ThreeColumnTableRow
                firstContent={ this.props.title }
                secondContent={ this.props.solved ? 
                    this.props.totalExercisePoints + "/" + this.props.totalExercisePoints
                :   "0/" + this.props.totalExercisePoints}
                thirdContent={ 
                    <Link to={this.props.localUrl + "/exercise-" + this.props.exerciseId 
                    + (window._userRole === "admin" ? "/edit" : "")}>
                        {window._userRole === "admin" ?
                        <React.Fragment>
                            Bearbeiten <Icon name="edit" />
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            Gehe zu<Icon name="arrow right" />
                        </React.Fragment>}</Link>} 
                />
        )
    }
}