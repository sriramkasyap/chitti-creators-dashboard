import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";

export const AuthContext = createContext();
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
        }
        this.setState({
          loginError: data.message,
        });
        return false;
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
        }
        this.setState({
          loginError: data.message,
        });
        return false;
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  fetchMe = async () => {
    const {
      router: { pathname },
    } = this.props;
    return fetch("/api/creators")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setLoggedInUser(data.creator);
          return true;
        }
        if (pathname !== "/login" && pathname !== "/signup") {
          this.setState({
            loginError: data.message,
          });
          return false;
        }
        return false;
      })
      .catch((err) => {
        this.setState({
          loginError: err,
        });
      });
  };

  render() {
    const { loggedInUser, loginError } = this.state;
    const { children } = this.props;
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
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(AuthProvider);
