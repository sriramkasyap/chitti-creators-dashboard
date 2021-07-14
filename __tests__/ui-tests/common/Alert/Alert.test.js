import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Alert from "../../../../src/components/common/Alert/Alert";

describe("Alert initial render", () => {
  it("should match the snapshot", () => {
    const container = render(
      <Alert message="Some Error" status="success" variant="left-accent" />
    );

    expect(container).toMatchSnapshot();
  });
});
