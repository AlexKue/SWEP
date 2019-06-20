import React from "react";

import API from '../API/API.jsx';

const AuthedContext = React.createContext();
export default AuthedContext;

export class AuthedContextProvider extends React.Component {
    isFetching = false;
    state = {
        categories: null,
        totalCategoriesCount: 0,
        userName: localStorage.getItem("userName"),
        initialized: false
    }

    forceUpdate = () => {
        this.setState({
            state: this.state
        })
    }
    initialize = () => {                   // We have to fetch them and build them
        if (!this.isFetching) {
            this.isFetching = true;             // As promises are async, we need to block further fetches
            let categories = new Map();
            let totalCategoriesCount = 0;
            API.getCategories()
            .then(response => {
                totalCategoriesCount = response.data.count;
                let categoriesResponse = response.data.data;
                categoriesResponse.map((category) => {
                    categories.set(category.id,
                    new Category(
                        category.title,
                        category.text,
                        0,              // TODO: Server is not sending this information so far
                        0,              // TODO: Server is not sending this information so far
                        category.id
                    ));
                });
            })
            .then(() => {
                console.log(categories);
            })
            .catch(error => {               // This shouldn't happen, so for debug purpose we output this to console
                console.log(error);
            }).finally(() => {
                this.isFetching = false;    // End blocking
                this.setState({
                    initialized: true,
                    categories: categories,
                    totalCategoriesCount: totalCategoriesCount
                });
            })
        }
    }
    getCategories = () => {
        return this.state.categories;
    }
    isInitialized = () => {
        return this.state.initialized;
    }
    getCategoryById = (Id) => {
        return this.state.categories.get(Id);
    }
    addCategory = (
        title,
        description,
        solvedExerciseCount,
        totalExerciseCount,
        id,
        exerciseIdList) => {
            this.state.categories.set(id, 
                new Category(
                title,
                description,
                solvedExerciseCount,
                totalExerciseCount,
                id,
                exerciseIdList
            ));
        
        // Trigger Update
        this.forceUpdate();
    }
    updateCategory = (Id, title, description) => {
        let category = this.getCategoryById(Id);
        category.title = title;
        category.description = description;

        // Trigger Update
        this.forceUpdate();
    }
    removeCategory = (Id) => {
        this.state.categories.delete(Id);

        this.forceUpdate();
    }
    getUserName = () => {
        return this.state.userName;
    }
    updateUserName = (newUserName) => {
        localStorage.setItem("userName", newUserName);
        this.setState({
            userName: newUserName
        });
    }

    render() {
        const contextValue = {
            getCategories: this.getCategories,
            initialize: this.initialize,
            getCategoryById: this.getCategoryById,
            addCategory: this.addCategory,
            updateCategory: this.updateCategory,
            removeCategory: this.removeCategory,
            setUserLoggedOut: this.props.setUserLoggedOut,
            getUserName: this.getUserName,
            updateUserName: this.updateUserName,
            isInitialized: this.isInitialized
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