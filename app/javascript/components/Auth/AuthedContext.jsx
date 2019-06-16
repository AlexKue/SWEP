import React from "react";

import API from '../API/API.jsx';

const AuthedContext = React.createContext();
export default AuthedContext;

export class AuthedContextProvider extends React.Component {
    isFetching = false;
    state = {
        categories: null
    }
    fetchCategories = () => {                   // We have to fetch them and build them
        if (!this.isFetching) {
            this.isFetching = true;             // As promises are async, we need to block further fetches 
            API.getCategories()
            .then(response => {
                let categories = new Map();
                let data = response.data;
                for (let [key, category] of Object.entries(data)) {
                    categories.set(category.id,
                        new Category(
                            category.title,
                            category.text,
                            0,              // TODO: Server is not sending this information so far
                            0,              // TODO: Server is not sending this information so far
                            category.id
                        ));
                }
                this.setState({
                    categories: categories
                });
                this.isFetching = false;    // For future fetch purposes
            })
            .catch(error => {               // This shouldn't happen, so for debug purpose we output this to console
                this.isFetching = false;    // For future fetch purposes
                console.log(error);
            })
        }
    }
    getCategories = () => {
        return this.state.categories;
    }

    render() {
        const contextValue = {
            getCategories: this.getCategories,
            fetchCategories: this.fetchCategories
        }
        return (
            <AuthedContext.Provider value={contextValue}>
                { this.props.children }
            </AuthedContext.Provider>
        );
    }
}

class Category {
    constructor(
        title,                      
        description,                 
        solvedExerciseCount,
        totalExerciseCount,
        id,
        exerciseIdList = null           // List of the exercise IDs belonging to that category
        // will be assigned when the category is opened the first time, as this is another request
    ) {
        this.title = title;
        this.description = description;
        this.solvedExerciseCount = solvedExerciseCount;
        this.totalExerciseCount = totalExerciseCount;
        this.id = id;
        this.exerciseIdList = exerciseIdList;
    }
}

class Exercise {

}