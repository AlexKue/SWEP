import React , { useContext } from "react";
import { withRouter, Route } from "react-router-dom";
import {
  Container,
  Loader
} from "semantic-ui-react";

import MenuBar from './MenuComponent/MenuBar.jsx';
import ExerciseSeries from './ExerciseSeries/ExerciseSeries.jsx';
import AuthedContext from './AuthedContext.jsx';

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
        <Route exact path="/" component={ExerciseSeries} />
      </React.Fragment>
    );
  }
}