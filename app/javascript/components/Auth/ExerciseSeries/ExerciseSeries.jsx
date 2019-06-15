import React from "react";
import {

} from "semantic-ui-react";

import CategoryList from './Category/CategoryList.jsx';
import { ExerciseSeriesContextProvider } from './ExerciseSeriesContext.jsx';

export default class ExerciseSeries extends React.Component {
    render() {
        return (
            <CategoryList />
        );
    }
}