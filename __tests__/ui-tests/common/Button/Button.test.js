import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "../../../../src/components/common/Button/Button";

describe("Button initial render", () => {
  it("should match the snapshot", () => {
    const mockFn = jest.fn();
    const container = render(
      <Button
        text="Button Text"
        rounded="full"
        variant="outline"
        className=""
        onClick={mockFn}
      />
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Button DOM element", () => {
  it("should render button element", () => {
    const { getByTestId } = render(<Button />);

    expect(getByTestId("chakra-btn")).toBeInTheDocument();
  });
});
