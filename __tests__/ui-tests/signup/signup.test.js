import router from "next/router";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Signup from "../../../pages/signup";
import AuthProvider, { AuthContext } from "../../../contexts/AuthContext";

describe("Test Signup initial render", () => {
  it("should match the snapshot", () => {
    const container = render(
      <AuthProvider>
        <Signup />
      </AuthProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Test Signup form", () => {
  it("should render the basic fields", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Signup />
      </AuthProvider>
    );
    expect(getByTestId("full-name")).toBeInTheDocument();
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("confirm-password")).toBeInTheDocument();
    expect(getByTestId("create-account")).toBeInTheDocument();
  });

  it("should check input values and submit form", () => {
    const contextValue = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
      loginError: "",
      userSignup: jest.fn(),
      fetchMe: jest.fn(),
    };

    const { getByTestId } = render(
      <AuthContext.Provider value={contextValue} router={router}>
        <Signup />
      </AuthContext.Provider>
    );

    fireEvent.change(getByTestId("full-name"), {
      target: { value: "John Doe" },
    });
    expect(getByTestId("full-name").value).toBe("John Doe");

    fireEvent.change(getByTestId("email"), {
      target: { value: "john@doe.com" },
    });
    expect(getByTestId("email").value).toBe("john@doe.com");

    fireEvent.change(getByTestId("password"), { target: { value: "123456" } });
    expect(getByTestId("password").value).toBe("123456");

    fireEvent.change(getByTestId("confirm-password"), {
      target: { value: "123456" },
    });
    expect(getByTestId("confirm-password").value).toBe("123456");

    fireEvent.click(getByTestId("create-account"));

    expect(contextValue.userSignup).toHaveBeenCalledTimes(1);
  });

  it("should check empty input value", () => {
    const contextValue = {
      loggedInUser: { profile: { fullName: "", displayPicture: null } },
      loginError: "",
      userSignup: jest.fn(),
      fetchMe: jest.fn(),
    };

    const { getByTestId } = render(
      <AuthContext.Provider value={contextValue} router={router}>
        <Signup />
      </AuthContext.Provider>
    );

    fireEvent.change(getByTestId("full-name"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("email"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("password"), { target: { value: "" } });

    fireEvent.change(getByTestId("confirm-password"), {
      target: { value: "" },
    });

    fireEvent.click(getByTestId("create-account"));

    expect(contextValue.userSignup).not.toBeCalled();
  });
});
