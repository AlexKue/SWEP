import React , { useContext } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import {
  Container,
  Loader
} from "semantic-ui-react";

import MenuBar from './MenuComponent/MenuBar.jsx';
import CategoryList from './ExerciseSeries/Category/CategoryList.jsx';
import AuthedContext from './AuthedContext.jsx';
import { CategoryView } from './ExerciseSeries/Category/CategoryView.jsx';
import CRUDCategoryView from './ExerciseSeries/Category/CRUDCategoryView.jsx';
import UserSettings from './User/UserSettings.jsx';
import ExerciseView from './ExerciseSeries/Exercise/ExerciseView.jsx';
import CRUDExerciseView from './ExerciseSeries/Exercise/CRUDExerciseView.jsx';
import ScoreboardView from './Scoreboard/ScoreboardView.jsx'
import TestComponent from '../TestComponent.jsx';
import UncertainQueryView from './ExerciseSeries/Query/UncertainQueryView.jsx';
import { __404 } from './Components/errors.jsx';

export const AuthedWrapper = (props) => {
  const context = useContext(AuthedContext);

  return (
    <AuthedComponent context={context} setUserLoggedOut={props.setUserLoggedOut}/>
  )
}

class AuthedComponent extends React.Component {
  
  componentDidMount() {
    // this should be enough for React to put this element into the dom
    // unfortunately there's no guarantee that the element is in the DOM,
    // so we need to make a 50ms "sleep" here
    setTimeout(() => {this.props.context.initialize()}, 50);
  }

  render() {
    if (this.props.context.isInitialized()) {
      return (
        <React.Fragment>
          <MenuBar setUserLoggedOut={ this.props.setUserLoggedOut } />
          <Container>
            <Switch>
              <Route exact path="/" component={CategoryList} />
              <Route exact path="/edit-profile" component={UserSettings} />
              <Route exact path="/category/create" render={(props) => <CRUDCategoryView {...props} />} />
              <Route exact path="/category-:categoryId/edit" render={(props) => <CRUDCategoryView {...props} />} />
              <Route exact path="/category-:categoryId" render={(props) => <CategoryView {...props} />} />
              <Route exact path="/category-:categoryId/exercise-:exerciseId/" render={(props) => <ExerciseView {...props} /> } />
              <Route exact path="/category-:categoryId/exercise-:exerciseId/edit" render={(props) => <CRUDExerciseView {...props} /> } />
              <Route exact path="/category-:categoryId/create-exercise" render={(props) => <CRUDExerciseView {...props} /> } />
              <Route exact path="/spielwiese" render={(props) => <ExerciseView type="spielwiese" {...props} /> } />
              <Route exact path="/scoreboard" render={(props) => <ScoreboardView {...props} /> } />
              <Route exact path="/validate-uncertain-solutions" render={(props) => <UncertainQueryView {...props} /> } />
              <Route exact path="/test" component={TestComponent} />
              <Route component={__404} />
            </Switch>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <Container>
          <Loader active>{ this.props.context.loadText }</Loader>
        </Container>
      );
    }
  }
}