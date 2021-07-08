import { render } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom/extend-expect";

describe("Button initial render", () => {
  it("should match the snapshot", () => {
    const container = render(<Button />);

    expect(container).toMatchSnapshot();
  });
});

describe("Button DOM element", () => {
  it("should render button element", () => {
    const { getByTestId } = render(<Button />);

    expect(getByTestId("chakra-btn")).toBeInTheDocument();
  });
});
