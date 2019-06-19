import axios from "axios";
import React from "react";
import {
  List
} from "semantic-ui-react";

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json"
  });

  static getErrorList(error) {
    let errorData = error.response.data;
    return (
      <List bulleted>
        {errorData.map((message) => <List.Item key={message}>{message}</List.Item>)}
      </List>
    );
  }

  static loginUser(email, password) {
    console.log("loginUser called");
    return new Promise((resolve, reject) => {
      this.service.post("auth", {
        session: {
          email: email,
          password: password
        },
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      });
    });
  }
  static logoutUser() {
    console.log("logoutUser called");
    return new Promise((resolve, reject) => {
        this.service.delete("logout", {
        data: {
          authenticity_token: window._token
        }
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      });
    });
  }
  static registerUser(name, email, password, password_confirmation) {
    console.log("registerUser called");
    return new Promise((resolve, reject) => {
      this.service.post("users", {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        },
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        reject(this.getErrorList(error));
      });
    });
  }
  static getUserList(offset = 0, limit = 30) {
    console.log("getUserList called");
    return new Promise((resolve, reject) => {
      this.service.get("users", {
        offset: offset,
        limit: limit,
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      });
    });
  }
  static getUserInfo(id) {
    console.log("getUserInfo called");
    return new Promise((resolve, reject) => {
      this.service.get("users/" + id, {
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static deleteUser(id) {
    console.log("deleteUser called");
    return new Promise((resolve, reject) => {
      this.service.delete("users/" + id, {
        data: {
          authenticity_token: window._token
        }
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static createCategory(title, text) {
    console.log("createCategory called");
    return new Promise((resolve, reject) => {
      this.service.post("categories", {
        category: {
          title: title,
          text: text
        },
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        reject(this.getErrorList(error));
      })
    });
  }
  static getCategories(offset = 0, limit = 30) {
    console.log("getCategories called");
    return new Promise((resolve, reject) => {
      this.service.get("categories", {
        offset: offset,
        limit: limit,
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static getCategoryInfo(id) {
    console.log("getCategoryInfo called");
    return new Promise((resolve, reject) => {
      this.service.get("categories/" + id, {
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static deleteCategory(id) {
    console.log("deleteCategory called");
    return new Promise((resolve, reject) => {
      this.service.delete("categories/" + id, {
        data: {
          authenticity_token: window._token
        }
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static updateCategory(id, title, description) {
    console.log("updateCateogry called: TODO, this function is currently not implemented!");
    return new Promise((resolve, reject) => {
      resolve(null);  //TODO: Implement
    });
  }
  static getExercises(id, offset = 0, limit = 30) {
    return new Promise((resolve, reject) => {
      this.service.get("categories/" + id + "/exercises", {
        offset: offset,
        limit: limit,
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static createExercise(id, title, text, points) {
    console.log("createExercise called");
    return new Promise((resolve, reject) => {
      this.service.post("categories/" + id + "/exercises", {
        exercise: {
          title: title,
          text: text,
          points: points
        },
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static getExerciseInfo(id) {
    console.log("getExerciseInfo called");
    return new Promise((resolve, reject) => {
      this.service.get("exercises/" + id, {
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  static deleteExercise(id) {
    console.log("deleteExercise called");
    return new Promise((resolve, reject) => {
      this.service.delete("exercises/" + id, {
        data: {
          authenticity_token: window._token
        }
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
}
