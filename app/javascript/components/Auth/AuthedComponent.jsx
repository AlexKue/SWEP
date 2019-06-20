import React , { useContext } from "react";
import { withRouter, Route } from "react-router-dom";
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
import TestComponent from '../TestComponent.jsx';

export const AuthedWrapper = (props) => {
  const context = useContext(AuthedContext);

  if (context.isInitialized()) {
    return (
      <AuthedComponent context={context} setUserLoggedOut={props.setUserLoggedOut}/>
    )
  } else {
    context.initialize();
    return (
      <Container>
        <Loader active>{ context.loadText }</Loader>
      </Container>
    )
  }
}

class AuthedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNick: "Matthias"  //TODO: Receive userNick from Server / show E-Mail
    };
  }

  render() {
    return (
      <React.Fragment>
        <MenuBar setUserLoggedOut={ this.props.setUserLoggedOut } />
        <Container>
          <Route exact path="/" component={CategoryList} />
          <Route exact path="/edit-profile" component={UserSettings} />
          <Route exact path="/category/create" render={(props) => <CRUDCategoryView {...props} />} />
          <Route exact path="/category-:categoryId/edit" render={(props) => <CRUDCategoryView {...props} />} />
          <Route exact path="/category-:categoryId" render={(props) => <CategoryView {...props} />} />
          <Route exact path="/category-:categoryId/exercise-:exerciseId/" render={(props) => <ExerciseView {...props} /> } />
          <Route exact path="/test" component={TestComponent} />
        </Container>
      </React.Fragment>
    );
  }
}