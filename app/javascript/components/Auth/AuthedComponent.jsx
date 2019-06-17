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

export const AuthedWrapper = (props) => {
  const context = useContext(AuthedContext);

  if (context.getCategories()) {
    return (
      <AuthedComponent context={context} setUserLoggedOut={props.setUserLoggedOut}/>
    )
  } else {
    context.fetchCategories();
    return (
      <Container>
        <Loader active>Lädt...</Loader>
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
          <Route exact path="/category-:id" component={CategoryView} />
        </Container>
      </React.Fragment>
    );
  }
}