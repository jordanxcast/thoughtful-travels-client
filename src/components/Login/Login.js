import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-services";
import ApiContext from "../../ApiContext";
import { Link } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  static contextType = ApiContext;

  handleSubmitBasicAuth = (e) => {
    e.preventDefault();
    const { user_name, password } = e.target;

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );

    user_name.value = "";
    password.value = "";
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      username: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.context.handleAuthToken(res.authToken);
        this.props.history.push(`/destinations`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className="Login-container">
        <form className="Login" onSubmit={this.handleSubmitJwtAuth}>
          <h1>Login</h1>
          <div className="user_name">
            <label htmlFor="Login-user-name">*User name</label>
            <input name="user_name" id="Login-user-name"></input>
          </div>
          <div className="password">
            <label htmlFor="Login-password">*Password</label>
            <input name="password" type="password" id="Login-password"></input>
          </div>
          <button type="submit" className="Login-submit">
            Login
          </button>
          <Link to="/sign-up" className="Login-signup">
            Create an account
          </Link>
        </form>
      </div>
    );
  }
}
