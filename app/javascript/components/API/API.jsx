import axios from "axios";

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json"
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
  static registerUser(name, email, password, password_confirmation) {
    console.log("Register user called");

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
    console.log("registerUser called");

    this.service.get("users", {
      offset: offset,
      limit: limit
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
}
