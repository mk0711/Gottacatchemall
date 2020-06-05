import React, { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordconf: "",
      username: "",
      firstname: "",
      lastname: ""
    };
  }

  handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    if (event.target.name === "email") {
      this.setState({ email: value });
    } else if (event.target.name === "password") {
      this.setState({ password: value });
    } else if (event.target.name === "username") {
      this.setState({ username: value });
    } else if (event.target.name === "firstname") {
      this.setState({ firstname: value });
    } else if (event.target.name === "lastname") {
      this.setState({ lastname: value });
    } else if (event.target.name === "passwordconf") {
      this.setState({ passwordconf: value });
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.errorMessage && (
          <p className="alert alert-danger">{this.props.errorMessage}</p>
        )}

        {this.props.user && (
          <div className="alert alert-success">
            <h1>Logged in as {this.props.user.displayName}</h1>
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            name="email"
            value={this.props.email}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.props.password}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              this.props.handleSignIn(this.state.email, this.state.password);
            }}
          >
            Sign In
          </button>
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            name="passwordconf"
            value={this.props.passwordconf}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            className="form-control"
            name="username"
            value={this.props.username}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <label>Firstname:</label>
          <input
            className="form-control"
            name="firstname"
            value={this.props.firstname}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <label>lastname:</label>
          <input
            className="form-control"
            name="lastname"
            value={this.props.lastname}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              this.props.handleSignUp(
                this.state.email,
                this.state.password,
                this.state.passwordconf,
                this.state.username,
                this.state.firstname,
                this.state.lastname
              );
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;