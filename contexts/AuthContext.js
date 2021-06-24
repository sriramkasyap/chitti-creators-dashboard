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

  userLogin = (userCreds) => {
    fetch("/api/creators/login", {
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
        } else {
          this.setState({
            loginError: data.message,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  userSignup = (userCreds) => {
    fetch("/api/creators/signup", {
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
        } else {
          this.setState({
            loginError: data.message,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  fetchMe = async () => {
    try {
      const res = await fetch("/api/creators");
      const { creator } = await res.json();
      if (creator) {
        this.setLoggedInUser(creator);
      } else {
        this.setLoggedInUser({
          profile: { fullName: "", displayPicture: null },
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
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
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;

export { AuthProvider, AuthContext };
