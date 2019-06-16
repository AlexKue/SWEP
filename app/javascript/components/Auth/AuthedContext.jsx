import React from "react";

import API from '../API/API.jsx';

const AuthedContext = React.createContext();
export default AuthedContext;

export class AuthedContextProvider extends React.Component {
    state = {
        categories: null
    }
    getCategories = () => {
        if (this.state.categories) {        // We fetched them once
            return this.state.categories;
        } else {                            // We have to fetch them and build them
            API.getCategories()
            .then(response => {
                let categories = new Map();
                let data = response.data;
                for (let [key, value] of Object.entries(data)) {
                    categories.set(value.id,
                        new Category(
                            value.title,
                            value.text,
                            0,              // TODO: Server is not sending this information so far
                            0,              // TODO: Server is not sending this information so far
                            value.id
                        ));
                }
                this.setState({
                    categories: categories
                });
            })
            .catch(error => {               // This shouldn't happen, so for debug purpose we output this to console
                console.log(error);
            })
        }
    }

    render() {
        const contextValue = {
            categories: this.state.categories,
            getCategories: this.getCategories
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