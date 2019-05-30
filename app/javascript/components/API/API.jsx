import axios from "axios";

export default class API {
  constructor() {
    super();

    this.service = axios.create({
      baseURL: "http://localhost:3000/api/",
      responseType: "json"
    })
  }

  loginUser(email, password) {
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
