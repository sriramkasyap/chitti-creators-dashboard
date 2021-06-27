import { createContext } from "react";

import React, { Component } from "react";

const AuthContext = createContext();
class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
      loginError: null,
    };
  }

  componentDidMount() {
    this.fetchMe();
  }

  setLoggedInUser = (loggedInUser) => {
    this.setState({
      loggedInUser,
    });
  };

  userLogin = async (userCreds) => {
    return fetch("/api/creators/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setLoggedInUser(data.creator);
          return true;
        } else {
          this.setState({
            loginError: data.message,
          });
          return false;
        }
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
        return false;
      });
  };

  userSignup = async (userCreds) => {
    return fetch("/api/creators/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setLoggedInUser(data.creator);
          return true;
        } else {
          this.setState({
            loginError: data.message,
          });
          return false;
        }
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  fetchMe = async () => {
    return fetch("/api/creators")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setLoggedInUser(data.creator);
          return true;
        } else {
          this.setState({
            loginError: data.message,
          });
          return false;
        }
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  render() {
    const { loggedInUser, loginError } = this.state;
    return (
      <AuthContext.Provider
        value={{
          loggedInUser,
          loginError,
          userLogin: this.userLogin,
          userSignup: this.userSignup,
          fetchMe: this.fetchMe,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;

export { AuthProvider, AuthContext };
