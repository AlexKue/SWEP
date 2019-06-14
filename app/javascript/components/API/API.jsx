import axios from "axios";

import APIHelper from './APIHelper.jsx';

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json"
  });

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
        reject(APIHelper.makeRegisterErrorList(error));
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
  static createCategory(title, text) {
    console.log("createCategory called");
    return new Promise((resolve, reject) => {
      this.service.post("categories", {
        category: {
          title: title,
          text: text
        }
      }).then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    });
  }
  static getCategories(offset = 0, limit = 30) {
    console.log("getCategories called");
    return new Promise((resolve, reject) => {
      this.service.get("categories", {
        offset: offset,
        limit: limit
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
      this.service.get("categories/" + id)
      .then(response => {
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
      this.service.delete("cateogires/" + id)
      .then(response => {
        /* IMPLEMENT LOGIC FOR PROCESSING DATA HERE */
        resolve(response);
      }).catch(error => {
        /* IMPLEMENT LOGIC FOR PROCESSING ERRORS HERE */
        reject(error);
      })
    })
  }
  
}
