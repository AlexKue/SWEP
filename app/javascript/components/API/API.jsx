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
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}
