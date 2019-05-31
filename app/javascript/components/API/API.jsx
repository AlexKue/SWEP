import axios from "axios";

export default class API {

  static service = axios.create({
    baseURL: "http://localhost:3000/api/",
    responseType: "json"
  });

  static loginUser(email, password) {
    console.log("loginUser called");

    return this.service.post("auth", {
      session: {
        email: email,
        password: password
      },
      authenticity_token: window._token
    });
  }
  static logoutUser() {
    console.log("logoutUser called");
    return this.service.delete("logout", {
      data: {
        authenticity_token: window._token
      }
    });
  }
  static registerUser(name, email, password, password_confirmation) {
    console.log("registerUser called");

    return this.service.post("users", {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      },
      authenticity_token: window._token
    });
  }
  static getUserList(offset = 0, limit = 30) {
    console.log("getUserList called");

    return this.service.get("users", {
      offset: offset,
      limit: limit,
      authenticity_token: window._token
    });
  }
}
