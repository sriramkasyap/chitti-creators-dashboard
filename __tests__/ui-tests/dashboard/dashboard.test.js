import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Dashboard from "../../../src/components/Dashboard/Dashboard";
import { NewslettersProvider } from "../../../contexts/NewslettersContext";

const cards = [
  {
    id: 1,
    title: "Active Subscribers",
    total: 500,
    icon: "user.png",
  },
  {
    id: 2,
    title: "Paid Subscribers",
    total: 300,
    icon: "user.png",
  },
  {
    id: 3,
    title: "Revenue (per month)",
    total: <span>&#x20b9;1500</span>,
    icon: "money.png",
  },
  {
    id: 4,
    title: "Newsletters Sent",
    total: 29,
    icon: "envelope.png",
  },
];

let container;

beforeEach(() => {
  container = render(
    <NewslettersProvider newsletterStatus={{ status: "draft" }}>
      <Dashboard cards={cards} isLoading={false} error="" />
    </NewslettersProvider>
  );
});

describe("Test Dashboard initial render", () => {
  it("should match the snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});

describe("Test initial getCardDetails api call", () => {
  it("should call getCardDetails", () => {
    expect(container.getAllByTestId("card")).toHaveLength(4);
  });
});

describe("Test props", () => {
  it("should render components on isLoading and error prop change", () => {
    const { rerender, getByTestId } = container;

    rerender(
      <NewslettersProvider newsletterStatus={{ status: "draft" }}>
        <Dashboard cards={cards} isLoading error="" />
      </NewslettersProvider>
    );

    expect(getByTestId("loading_image")).toBeInTheDocument();

    rerender(
      <NewslettersProvider newsletterStatus={{ status: "draft" }}>
        <Dashboard cards={cards} isLoading={false} error="Some Error!" />
      </NewslettersProvider>
    );

    expect(getByTestId("notification")).toBeInTheDocument();
  });
});
