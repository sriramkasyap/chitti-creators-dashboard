/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import * as sinon from "sinon";
import {
  debounce,
  generateRandomString,
  getFormattedDate,
  getIronConfig,
  isEmpty,
  noop,
  serializeObject,
  tablifyEmailer,
  ucFirst,
  validateEmail,
  validateURL,
} from "../src/utils";

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

describe("Common Util functions", () => {
  test("Text Capitalization", () => {
    expect(ucFirst("hello")).toBe("Hello");
  });

  test("Dummy Function", () => {
    expect(noop()).toBeUndefined();
  });

  test("Random Text Generation", () => {
    const genStrig = generateRandomString();
    const genStrig10 = generateRandomString(10);
    const genStrig10n = generateRandomString(5, true);
    expect(genStrig).toHaveLength(6);
    expect(genStrig10).toHaveLength(10);
    expect(genStrig10n).toHaveLength(5);
    expect(Number(genStrig10n)).not.toBeNaN();
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

  test("URL Validation", () => {
    expect(validateURL("https://facebook.com?a=1&b=2#123")).toEqual(true);
    expect(validateURL("http://facebook.com?a=1&b=2#123")).toEqual(true);
    expect(validateURL("https://facebookcom?a=1&b=2#123")).toEqual(false);
  });

  test("Debounce Function", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    // Call it immediately
    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // Call it several times with 500ms between each call
    for (let i = 0; i < 10; i += 1) {
      clock.tick(500);
      debouncedFunc();
    }
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // wait 1000ms
    clock.tick(1100);
    expect(func).toHaveBeenCalledTimes(1); // function called
  });

  test("Object Serialization", () => {
    expect(serializeObject({ status: "draft", page: 10 })).toBe(
      "status=draft&page=10"
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

  test("Check if Object is empty", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(" ")).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty(["this", "is", "array"])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(" 1 ")).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty("hello world ")).toBe(false);
  });

  test("Get formatted Date", () => {
    expect(getFormattedDate("2021-07-06T04:57:01.960+00:00")).toContain(
      "06-07-2021 10:27:01"
    );
  });
});
