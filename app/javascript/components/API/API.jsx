import axios from "axios";

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json"
  });

  static loginUser(email, password) {

    this.service.post("auth", {
      session: {
        email: email,
        password: password
      },
      authenticity_token: window._token
    }).then(response => {
      console.log(response);
      return "200";
    }).catch(error => {
      console.log(error);
      return "401";
    });
  }

  static registerUser(name, email, password, password_confirmation) {

    this.service.post("users", {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
}
