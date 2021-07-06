/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import {
  getFormattedDate,
  getIronConfig,
  serializeObject,
  tablifyEmailer,
  ucFirst,
  validateEmail,
} from "../src/utils";

describe("Common Util functions", () => {
  test("Text Capitalization", () => {
    expect(ucFirst("hello")).toBe("Hello");
  });

  test("Iron Config", () => {
    const ironConfig = getIronConfig();
    expect(Object.keys(ironConfig)).toEqual(
      expect.arrayContaining(["cookieName", "password", "ttl", "cookieOptions"])
    );
    expect(Object.keys(ironConfig.cookieOptions)).toEqual(
      expect.arrayContaining(["sameSite", "secure", "maxAge"])
    );
  });

  test("Object Serialization", () => {
    expect(serializeObject({ status: "draft", page: 10 })).toBe(
      "status=draft&page=10"
    );
  });

  test("Date Format", () => {
    expect(getFormattedDate("2021-07-06T04:57:01.960+00:00")).toBe(
      "06-07-2021 10:27:01"
    );
  });

  test("Emailer is generated from body", () => {
    const receivedOutput = tablifyEmailer("<p>Hello World</p>");

    const newNode = document.createElement("div");
    newNode.innerHTML = receivedOutput;

    const table = newNode.querySelector("table");

    expect(table).toBeValid();
    expect(table).toContainHTML("<p>Hello World</p>");
  });

  test("Email Validation", () => {
    expect(validateEmail("test@gmail.com")).toBe(true);
    expect(validateEmail("test@google.io")).toBe(true);
    expect(validateEmail("test.come@google.co.in")).toBe(true);
    expect(validateEmail("test@gmail")).toBe(false);
  });
});
