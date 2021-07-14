import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SubscriberList from "../../../src/components/SubscribersList/SubscribersList";

const subscribers = [
  {
    email: "sara.andersen@example.com",
    name: "Ms. Sara Andersen",
    subscriptionType: "Free",
  },
  {
    email: "edita.vestering@example.com",
    name: "Miss. Edita Vestering",
    subscriptionType: "Free",
  },
  {
    email: "roberto.vega@example.com",
    name: "Mr. Roberto Vega",
    subscriptionType: "Paid",
  },
  {
    email: "rudi.droste@example.com",
    name: "Mr. Rudi Droste",
    subscriptionType: "Free",
  },
  {
    email: "carolina.lima@example.com",
    name: "Mrs. Carolina Lima",
    subscriptionType: "Paid",
  },
  {
    email: "emre.asikoglu@example.com",
    name: "Mr. Emre Asikoglu",
    subscriptionType: "Free",
  },
  {
    email: "kent.brewer@example.com",
    name: "Mr. Kent Brewer",
    subscriptionType: "Free",
  },
  {
    email: "evan.carlson@example.com",
    name: "Mr. Evan Carlson",
    subscriptionType: "Free",
  },
  {
    email: "friedrich-karl.brand@example.com",
    name: "Mr. Friedrich-Karl Brand",
    subscriptionType: "Paid",
  },
  {
    email: "valentin.ortega@example.com",
    name: "Mr. Valentin Ortega",
    subscriptionType: "Free",
  },
];

const pagination = {
  limit: 10,
  page: 0,
};

const totalCount = 44;

let container;

beforeEach(() => {
  const mockSetPagination = jest.fn();
  container = render(
    <SubscriberList
      subscribers={subscribers}
      isLoading={false}
      error=""
      totalCount={totalCount}
      pagination={pagination}
      setPagination={mockSetPagination}
    />
  );
});

describe("Test Subscriber initial render", () => {
  it("should match the snapshot", () => {
    expect(container).toMatchSnapshot();
  });
});

describe("Test if no data received", () => {
  it("should render no data text if subscribers is empty", () => {
    const mockSetPagination = jest.fn();

    const { rerender, getByTestId } = container;

    rerender(
      <SubscriberList
        subscribers={[]}
        isLoading={false}
        error=""
        totalCount={0}
        pagination={pagination}
        setPagination={mockSetPagination}
      />
    );

    expect(getByTestId("no-subscribers-data")).toBeInTheDocument();
  });

  it("should render components on isLoading and error prop change", () => {
    const mockSetPagination = jest.fn();

    const { rerender, getByTestId } = container;

    rerender(
      <SubscriberList
        subscribers={subscribers}
        isLoading
        error=""
        totalCount={totalCount}
        pagination={pagination}
        setPagination={mockSetPagination}
      />
    );

    expect(getByTestId("loading-image")).toBeInTheDocument();

    rerender(
      <SubscriberList
        subscribers={subscribers}
        isLoading={false}
        error="Some error"
        totalCount={totalCount}
        pagination={pagination}
        setPagination={mockSetPagination}
      />
    );

    expect(getByTestId("notification")).toBeInTheDocument();
  });
});
