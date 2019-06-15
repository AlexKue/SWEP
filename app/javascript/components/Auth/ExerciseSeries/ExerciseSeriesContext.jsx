import React from "react";

export const ExerciseSeriesContext = React.createContext();

export class ExerciseSeriesContextProvider extends React.Component {
    state = {
        text: "This is a testtext"
    }
    updateText = () => {
        this.setState({
            text: "This is a new text"
        })
    }

    render() {
        const contextValue = {
            text: this.state.text,
            updateText: this.updateText
        }
        return (
            <ExerciseSeriesContext.Provider value={contextValue}>
                { this.props.children }
            </ExerciseSeriesContext.Provider>
        );
    }
}