import React from "react";

import API from '../API/API.jsx';

const AuthedContext = React.createContext();
export default AuthedContext;

export class AuthedContextProvider extends React.Component {
    isFetching = false;
    state = {
        categories: null,
        exercises: null,
        queries: null,
        totalCategoriesCount: 0,
        userName: localStorage.getItem("userName"),
        initialized: false,
        loadText: "Starte..."
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
            let exercises = new Map();
            let totalCategoriesCount = 0;
            let promiseExerciseList = [];
            API.getCategories()
            .then(response => {
                this.setState({
                    loadText: "Lade Serien..."
                });
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
                this.setState({
                    loadText: "Lade Aufgaben..."
                });
                for (let [categoryId, category] of categories) {
                    promiseExerciseList.push(new Promise((resolve, reject) => {
                        API.getExercisesForCategory(category.id)
                        .then(response => {
                            let totalExerciseCount = response.data.count;
                            let exerciseListResponse = response.data.data;
                            let exerciseIdSet = new Set();
                            for (const exercise of exerciseListResponse) {
                                exercises.set(exercise.id, new Exercise(
                                    exercise.title,
                                    "",
                                    exercise.points,
                                    false,
                                    exercise.id
                                ));
                                exerciseIdSet.add(exercise.id);
                            }
                            category.totalExerciseCount = totalExerciseCount;
                            category.exerciseIdSet = exerciseIdSet;
                            resolve(true);
                        }).catch(error => {
                            console.error(error);
                            reject(error);
                        })
                    }));
                }
            })
            .catch(error => {               // This shouldn't happen, so for debug purpose we output this to console
                console.log(error);
            }).finally(() => {
                Promise.all(promiseExerciseList).then(response => {
                    this.isFetching = false;    // End blocking
                    this.setState({
                        initialized: true,
                        categories: categories,
                        exercises: exercises,
                        queries: new Map(),
                        totalCategoriesCount: totalCategoriesCount
                    });
                });
            })
        }
    }
    getCategories = () => {
        return this.state.categories;
    }
    getExercises = () => {
        return this.state.exercises;
    }
    isInitialized = () => {
        return this.state.initialized;
    }
    getCategoryById = (Id) => {
        return this.state.categories.get(Id);
    }
    getExerciseById = (Id) => {
        return this.state.exercises.get(Id);
    }
    fetchExerciseInformation = (Id) => {
        return new Promise((resolve, reject) => {
            API.getExerciseInfo(Id)
            .then(response => {
                let exercise = response.data;
                this.state.exercises.set(Id, new Exercise(
                    exercise.title,
                    exercise.text,
                    exercise.points,
                    null,
                    Id
                ));
                resolve(true);
            }).catch(error => {
                reject(error);
            }).finally(() => {
                this.forceUpdate();
            })
        });
    }
    getExercisesForCategory = (Id) => {
        return this.state.categories.get(Id).exerciseIdSet;
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
    addExercise = (
        categoryId,
        title,
        description,
        totalExercisePoints,
        exerciseId,
        solved,
        queryIdSet = new Set()) => {
            this.state.exercises.set(exerciseId,
                new Exercise(
                    title,
                    description,
                    totalExercisePoints,
                    solved,
                    exerciseId,
                    queryIdSet
                ));
            this.getCategoryById(categoryId).addExercise(exerciseId);
            // Trigger Update
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
            getExercises: this.getExercises,
            getExercisesForCategory: this.getExercisesForCategory,
            initialize: this.initialize,
            getCategoryById: this.getCategoryById,
            getExerciseById: this.getExerciseById,
            addCategory: this.addCategory,
            updateCategory: this.updateCategory,
            removeCategory: this.removeCategory,
            addExercise: this.addExercise,
            setUserLoggedOut: this.props.setUserLoggedOut,
            getUserName: this.getUserName,
            updateUserName: this.updateUserName,
            isInitialized: this.isInitialized,
            loadText: this.state.loadText,
            fetchExerciseInformation: this.fetchExerciseInformation
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
        exerciseIdSet = new Set()
    ) {
        this.title = title;
        this.description = description;
        this.solvedExerciseCount = solvedExerciseCount;
        this.totalExerciseCount = totalExerciseCount;
        this.id = id;
        this.exerciseIdSet = exerciseIdSet;
    }

    addExercise = (exerciseId) => {
        this.totalExerciseCount += 1;
        this.exerciseIdSet.add(exerciseId);
    } 
}

class Exercise {
    constructor(
        title,
        description,
        totalExercisePoints,
        solved,
        id,
        queryIdSet = new Set()
    ) {
        this.title = title;
        this.description = description;
        this.totalExercisePoints = totalExercisePoints;
        this.solved = solved;
        this.id = id;
        this.queryIdSet = new Set();
    }
}

class Query{
    constructor(
        query,
        id
    ) {
        this.query = query;
        this.id = id;
    }
}