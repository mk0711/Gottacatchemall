import React, { Component } from "react";
import Auth from "./auth";
//import Error from "./NotFound"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      errorMessage: ""
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  // Add a handleSignUp() method
  handleSignUp(email, password, passwordconf, username, firstname, lastname) {
    this.removeError();
    let values = {
      email: email,
      password: password,
      passwordConf: passwordconf,
      userName: username,
      firstName: firstname,
      lastName: lastname
    };

    let json = JSON.stringify(values);
    let dataURL = "https://api.mtothekay.me/v1/users";
    let request = {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(dataURL, request)
      .then(this.setAuthHeader)
      .then(this.parseAsJSON)
      .then(newUser => this.setState({ user: newUser }))
      .catch(this.handleError);
  }

  setAuthHeader(response) {
    localStorage.setItem("authHeader", response.headers.get("Authorization"));
    return response;
  }

  parseAsJSON(response) {
    if (response.status < 300) {
      return response.json();
    }
    return response.text().then(err => {
      throw err;
    });
  }

  handleError(err) {
    this.setState({ errorMessage: err });
  }

  removeError() {
    this.setState({ errorMessage: null });
  }

  handleSignIn(email, password) {
    this.removeError();
    let obj = {
      email: email,
      password: password
    };

    let json = JSON.stringify(obj);
    let dataURL = "https://api.mtothekay.me/v1/sessions";
    let request = {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(dataURL, request)
      .then(this.setAuthHeader)
      .then(this.parseAsJSON)
      .then(user => this.setState({ user: user }))
      .catch(this.handleError);
  }

  handleSignOut() {
    this.removeError();
    let dataURL = "https://api.mtothekay.me/v1/sessions/mine";
    let request = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authHeader")
      }
    };

    fetch(dataURL, request)
      .then(response => {
        console.log(response.status);
        if (response.ok) {
          return response;
        }
        return response.text().then(err => {
          throw err;
        });
      })
      .then(response => {
        localStorage.clear();
        this.setState({ user: null });
        return response;
      })
      .catch(this.handleError);
  }

  render() {
    return (
      <div className="container">
          <Auth
            errorMessage={this.state.errorMessage}
            user={this.state.user}
            handleSignUp={this.handleSignUp}
            handleSignIn={this.handleSignIn}
          />
      </div>
    );
  }
}

export default Login;




