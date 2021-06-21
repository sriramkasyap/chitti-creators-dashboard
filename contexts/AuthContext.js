import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  const userLogin = async (userCreds) => {
    try {
      const res = await fetch("/api/creators/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
      });
      console.log("RB:: File: AuthContext.js, Line: 17 ==> res", res);
      const user = await res.json();
      setLoggedInUser(user);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
