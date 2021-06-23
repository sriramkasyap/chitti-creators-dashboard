import { createContext } from "react";

import React, { Component } from "react";

const AuthContext = createContext();
class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
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
    try {
      const res = await fetch("/api/creators/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
      });
      const user = await res.json();
      this.setLoggedInUser(user);
    } catch (err) {
      console.log("Error", err);
    }
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
    return (
      <AuthContext.Provider
        value={{
          loggedInUser: this.state.loggedInUser,
          userLogin: this.userLogin,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;

export { AuthProvider, AuthContext };
