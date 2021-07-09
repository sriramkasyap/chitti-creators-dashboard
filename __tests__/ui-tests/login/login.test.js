import router from "next/router";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Login from "../../../pages/login";
import AuthProvider, { AuthContext } from "../../../contexts/AuthContext";

describe("Test Login initial render", () => {
  it("should match the snapshot", () => {
    const container = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Test Login form", () => {
  it("should render the basic fields", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("login-button")).toBeInTheDocument();
  });

  it("should check input values and submit form", () => {
    const contextValue = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
      loginError: "",
      userLogin: jest.fn(),
      fetchMe: jest.fn(),
    };

    const { getByTestId } = render(
      <AuthContext.Provider value={contextValue} router={router}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "john@doe.com" },
    });
    expect(getByTestId("email").value).toBe("john@doe.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123456" } });
    expect(getByTestId("password").value).toBe("123456");

    fireEvent.click(getByTestId("login-button"));

    expect(contextValue.userLogin).toHaveBeenCalledTimes(1);
  });

  it("should check empty input value", () => {
    const contextValue = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
      loginError: "",
      userLogin: jest.fn(),
      fetchMe: jest.fn(),
    };

    const { getByTestId, getAllByText } = render(
      <AuthContext.Provider value={contextValue} router={router}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("password"), { target: { value: "" } });

    fireEvent.click(getByTestId("login-button"));

    expect(getAllByText("This Field is Required!")).toHaveLength(2);
    expect(contextValue.userLogin).not.toBeCalled();
  });

  it("should check email validation", () => {
    const { getByTestId, getByText, queryByText } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "john@doe" },
    });

    fireEvent.click(getByTestId("login-button"));
    expect(getByText("Invalid Email")).toBeInTheDocument();

    fireEvent.change(getByTestId("email"), {
      target: { value: "john" },
    });

    fireEvent.click(getByTestId("login-button"));
    expect(getByText("Invalid Email")).toBeInTheDocument();

    fireEvent.change(getByTestId("email"), {
      target: { value: "john@doe.com" },
    });

    fireEvent.click(getByTestId("login-button"));
    expect(queryByText("Invalid Email")).not.toBeInTheDocument();
  });
});
