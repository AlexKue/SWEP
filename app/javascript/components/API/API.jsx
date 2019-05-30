import axios from "axios";

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json",
    withCredentials: true
  });
  static loginUser(email, password) {
    console.log("loginUser called");

    this.service.post("auth", {
      session: {
        email: email,
        password: password
      },
      authenticity_token: window._token
    }).then(response => {
      console.log(response);
      return true;
    }).catch(error => {
      console.log(error);
      return false;
    });
  }
  static logoutUser() {
    console.log("logoutUser called");
    this.service.delete("logout", {
      data: {
        authenticity_token: window._token
      }
    })
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
  }
  static registerUser(name, email, password, password_confirmation) {
    console.log("registerUser called");

    this.service.post("users", {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      },
      authenticity_token: window._token
    }).then(response => {
      console.log(response);
      return true;
    }).catch(error => {
      console.log(error);
      return false;
    })
  }
  static getUserList(offset = 0, limit = 30) {
    console.log("getUserList called");

    this.service.get("users", {
      offset: offset,
      limit: limit,
      authenticity_token: window._token
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
}
