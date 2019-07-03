import React, { useContext } from "react";
import { __RouterContext, Link } from "react-router-dom";
import {
    Button,
    Grid,
    Icon
} from "semantic-ui-react";

import { __404 } from '../../Components/errors.jsx';
import AuthedContext from '../../AuthedContext.jsx';
import ThreeColumnTable, { ThreeColumnTableRow } from '../../Components/ThreeColumnTable.jsx';

export const CategoryView = (props) => {    // props is containing the Router context
    let context = useContext(AuthedContext);
    let categoryId = parseInt(props.match.params.categoryId);
    let category = context.getCategories().get(categoryId);
    if (!category) {
        return <__404 />;
    }
    let exercises = category.exerciseMap;
    let localUrl = props.history.location.pathname;
    let exerciseIdSet = category.getExerciseIdSet();

    return (
        <React.Fragment>
            <CategoryViewComponent key={ "catv_" + categoryId }
                    title={ category.title }
                    description={ category.description }
                    exerciseIdSet={ exerciseIdSet }
                    localUrl={ localUrl }
                    context={ context }
                    {...props} />
            { context.getUserRole() === "admin" ?
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
                key={ "excl" + exercise.id } 
                context={ context } />
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

const ExerciseListItem = (props) => {

    return (
        <ThreeColumnTableRow
            firstContent={ props.title }
            secondContent={ props.solved ? 
                props.totalExercisePoints + "/" + props.totalExercisePoints
            :   "0/" + props.totalExercisePoints}
            thirdContent={ 
                <Link to={props.localUrl + "/exercise-" + props.exerciseId 
                + (props.context.getUserRole() === "admin" ? "/edit" : "")}>
                    {props.context.getUserRole() === "admin" ?
                    <React.Fragment>
                        Bearbeiten <Icon name="edit" />
                    </React.Fragment>
                    : 
                    <React.Fragment>
                        Gehe zu<Icon name="arrow right" />
                    </React.Fragment>}</Link>} 
            />
    );
}