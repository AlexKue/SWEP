import axios from "axios";
import React from "react";
import {
  List
} from "semantic-ui-react";

export default class API {

  static service = axios.create({
    baseURL: window.location.origin + "/api/",
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
  static getUserList(offset = 0, limit = Number.MAX_SAFE_INTEGER) {
    console.log("getUserList called");
    return new Promise((resolve, reject) => {
      this.service.get("users?offset=" + offset + "&limit=" + limit)
      .then(response => {
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
  static updateUser(id, oldPassword, newName = null, newMail = null, hideInRanking = null, newPassword = null, newPasswordConf = null) {
    console.log("updateUser called");
    let userObject = {
      id
    };
    newName != null ? userObject.name = newName : null;
    newMail != null? userObject.email = newMail : null;
    hideInRanking != null ? userObject.hide_in_ranking = hideInRanking : null;
    newPassword != null ? userObject.password = newPassword : null;
    newPasswordConf != null ? userObject.password_confirmation = newPasswordConf : null;
    return new Promise((resolve, reject) => {
      this.service.patch("users/" + id, {
        user: userObject,
        authenticity_token: window._token,
        password: oldPassword
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        reject(this.getErrorList(error));
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
  static getCategories(offset = 0, limit = Number.MAX_SAFE_INTEGER) {
    console.log("getCategories called");
    return new Promise((resolve, reject) => {
      this.service.get("categories?offset=" + offset + "&limit=" + limit)
      .then(response => {
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
      this.service.patch("categories/" + id, {
        category: {
          title: title,
          text: description
        },
        authenticity_token: window._token
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(this.getErrorList(error));
      })
    });
  }
  static getExercisesForCategory(id, offset = 0, limit = Number.MAX_SAFE_INTEGER) {
    return new Promise((resolve, reject) => {
      this.service.get("categories/" + id + "/exercises?offset=" + offset + "&limit=" + limit)
      .then(response => {
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
        reject(this.getErrorList(error));
      })
    })
  }
  static updateExercise(exerciseId, title, text, points) {
    console.log("updateExercise Called");
    return new Promise((resolve, reject) => {
      this.service.patch("exercises/" + exerciseId, {
        exercise: {
          title: title,
          text: text,
          points: points
        },
        authenticity_token: window._token
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(this.getErrorList(error));
      });
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
  static solveExercise(exerciseId, query) {
    console.log("solveExercise called");
    return new Promise((resolve, reject) => {
      this.service.post("exercises/" + exerciseId + "/solve", {
        id: exerciseId,
        query: query,
        authenticity_token: window._token
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
  static createQuery(exerciseId, query) {
    console.log("Create Query called");
    return new Promise((resolve, reject) => {
      this.service.post("exercises/" + exerciseId + "/queries", {
        query: {
          query: query
        },
        authenticity_token: window._token
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error.response);
      })
    })
  }
  static getQuery(queryId) {
    console.log("getQuery called");
    return new Promise((resolve, reject) => {
      this.service.get("queries/" + queryId, {
        authenticity_token: window._token
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
  static getQueries(exerciseId, offset = 0, limit = 30) {
    console.log("Get Queries called");
    return new Promise((resolve, reject) => {
      this.service.get("exercises/" + exerciseId + "/queries?offset=" + offset + "&limit=" + limit)
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    })
  }
  static updateQuery(queryId, newQuery) {
    console.log("Update Queries Called");
    return new Promise((resolve, reject) => {
      this.service.patch("queries/" + queryId, {
        query: {
          query: newQuery
        },
        authenticity_token: window._token
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error.response);
      })
    });
  }
  static deleteQuery(queryId) {
    console.log("Delete Queries called");
    return new Promise((resolve, reject) => {
      this.service.delete("queries/" + queryId, {
        data: {
          authenticity_token: window._token
        }
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
  static getScoreboard(offset = 0, limit = Number.MAX_SAFE_INTEGER) {
    console.log("Get Scoreboard called");
    return new Promise((resolve, reject) => {
      this.service.get("users/ranking?offset=" + offset + "&limit=" + limit)
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    });
  }
  static getUncertainSolutionList(offset = 0, limit = 30) {
    console.log("Get Uncertain Solution List called");
    return new Promise((resolve, reject) => {
      this.service.get("exercises/index-uncertain-solutions")
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
  static getUncertainSolutionListForExercise(exerciseId) {
    console.log("Get Uncertain Solution List for exercise called");
    return new Promise((resolve, reject) => {
      this.service.get("exercises/" + exerciseId + "/uncertain-solutions")
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
  static updateUncertainSolution(userId, exerciseId, solved) {
    console.log("Update Uncertaion Solution called");
    return new Promise((resolve, reject) => {
      this.service.patch("exercises/" + exerciseId + "/uncertain-solutions", {
        authenticity_token: window._token,
        user_id: userId,
        solved: solved
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
