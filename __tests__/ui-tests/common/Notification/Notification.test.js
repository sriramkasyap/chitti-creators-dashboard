import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Notification from "../../../../src/components/common/Notification/Notification";

describe("Notification initial render", () => {
  it("should match the snapshot", () => {
    const container = render(<Notification message="Some text" />);

    expect(container).toMatchSnapshot();
  });
});
