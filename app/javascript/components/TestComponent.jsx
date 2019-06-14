import React from "react";
import {
  Message
} from "semantic-ui-react";

import API from './API/API.jsx';

/*
  This component is just for test purposes. It will be pushed to the git but
  changes will not be documented.
*/

export default class TestComponent extends React.Component {

  constructor() {
    super();

    this.logintest = this.logintest.bind(this);
    this.logouttest = this.logouttest.bind(this);
    this.userlisttest = this.userlisttest.bind(this);
    this.registertest = this.registertest.bind(this);
    this.getuserbyidtest = this.getuserbyidtest.bind(this);
    this.deleteuserbyidtest = this.deleteuserbyidtest.bind(this);
    this.createcategorytest = this.createcategorytest.bind(this);
    this.getcategoriestest = this.getcategoriestest.bind(this);
    this.getcategoryinfotest = this.getcategoryinfotest.bind(this);
    this.deletecategorytest = this.deletecategorytest.bind(this);

    this.updateName = this.updateName.bind(this);
    this.updateMail = this.updateMail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConf = this.updatePasswordConf.bind(this);
    this.updateCategoryId = this.updateCategoryId.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateExerciseId = this.updateExerciseId.bind(this);
    this.updateCategoryTitle = this.updateCategoryTitle.bind(this);
    this.updateCategoryText = this.updateCategoryText.bind(this);

    this.state = {
      name: "",
      email: "admin@sqrrl.com",
      password: "password",
      passwordConf: "",
      errorList: "",
      categoryId: "",
      userId: "",
      exerciseId: "",
      categoryTitle: "",
      categoryText: ""
    }
  }

  logintest() {
    API.loginUser(this.state.email, this.state.password)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  logouttest() {
    API.logoutUser()
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  userlisttest() {
    API.getUserList()
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  getuserbyidtest() {
    API.getUserInfo(this.state.userId)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  deleteuserbyidtest() {
    API.deleteUser(this.state.userId)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  registertest() {
    API.registerUser(this.state.name, this.state.email, this.state.password, this.state.passwordConf)
    .then(response => {
      console.log(response);
    }).catch(error => {
      this.setState({
        errorList: <Message>{error}</Message> /* necessary to simulate register form*/
      });
    });
  }
  createcategorytest() {
    API.createCategory(this.state.categoryTitle, this.state.categoryText)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
  getcategoriestest() {
    API.getCategories()
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
  getcategoryinfotest() {
    API.getCategoryInfo(this.state.categoryId)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
  deletecategorytest() {
    API.deleteCategory(this.state.categoryId)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }
  updateMail(event) {
    this.setState({
      email: event.target.value
    });
  }
  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }
  updatePasswordConf(event) {
    this.setState({
      passwordConf: event.target.value
    });
  }
  updateCategoryId(event) {
    this.setState({
      categoryId: event.target.value
    })
  }
  updateUserId(event) {
    this.setState({
      userId: event.target.value
    })
  }
  updateExerciseId(event) {
    this.setState({
      exerciseId: event.target.value
    })
  }
  updateCategoryTitle(event) {
    this.setState({
      categoryTitle: event.target.value
    })
  }
  updateCategoryText(event) {
    this.setState({
      categoryText: event.target.value
    })
  }



  render() {
    return (
      <React.Fragment>
        <input onChange={this.updateName} placeholder="Username" value={this.state.name} />
        <input onChange={this.updateMail} placeholder="E-Mail" value={this.state.email} />
        <input onChange={this.updatePassword} placeholder="Password" value={this.state.password} type="password" />
        <input onChange={this.updatePasswordConf} placeholder="Password" value={this.state.passwordConf} type="password" />
        <br/>
        <button onClick={this.logintest}>Login</button>
        <button onClick={this.userlisttest}>UserList</button>
        <button onClick={this.logouttest}>Logout</button>
        <button onClick={this.registertest}>Register</button>
        <br/><br/>
        <input onChange={this.updateCategoryId} placeholder="Category ID" value={this.state.categoryId} />
        <input onChange={this.updateExerciseId} placeholder="Exercise ID" value={this.state.exerciseId} />
        <input onChange={this.updateUserId} placeholder="User ID" value={this.state.userId} />
        <br/>
        <input onChange={this.updateCategoryTitle} placeholder="Category Title" value={this.state.categoryTitle} />
        <input onChange={this.updateCategoryText} placeholder="Category Text" value={this.state.categoryText} />
        <br/>
        <button onClick={this.getuserbyidtest}>Get User Info</button>
        <button onClick={this.deleteuserbyidtest}>Delete User</button>
        <br/>
        <button onClick={this.createcategorytest}>Create Category</button>
        <button onClick={this.getcategoriestest}>Get Categories</button>
        <button onClick={this.getcategoryinfotest}>Get Category Info</button>
        <button onClick={this.deletecategorytest}>Delete Category</button>
        <br/>
        <h1>Fehlerliste:</h1>
        <div>{ this.state.errorList }</div>
      </React.Fragment>
    );
  }
}
