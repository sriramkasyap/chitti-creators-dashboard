import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NewslettersList from "../../../src/components/NewslettersList/NewslettersList";
import { NewslettersContext } from "../../../contexts/NewslettersContext";

const newsletters = [
  {
    reference: "Newsletter 1",
    emailSubject: "Newsletter 1",
    createdAt: "2021-07-12T09:54:52.918Z",
    status: "draft",
  },
  {
    reference: "Newsletter 2",
    emailSubject: "Newsletter 2",
    createdAt: "2021-07-12T10:23:52.918Z",
    status: "published",
  },
  {
    reference: "Newsletter 3",
    emailSubject: "Newsletter 3",
    createdAt: "2021-07-12T10:15:52.918Z",
    status: "draft",
  },
];

let container;

afterEach(cleanup);

describe("Test Newsletters initial render", () => {
  it("should match the snapshot", () => {
    const contextValue = {
      newsletters,
      isLoading: false,
      error: "",
      getNewsletterLink: jest.fn(),
      pagination: {
        limit: 10,
        page: 0,
      },
      setPagination: jest.fn(),
      totalCount: 40,
    };

    container = render(
      <NewslettersContext.Provider value={contextValue}>
        <NewslettersList />
      </NewslettersContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Test if no data received", () => {
  it("should render no data text if newsletters is empty", () => {
    const contextValue = {
      newsletters: [],
      isLoading: false,
      error: "",
      getNewsletterLink: jest.fn(),
      pagination: {
        limit: 10,
        page: 0,
      },
      setPagination: jest.fn(),
      totalCount: 0,
    };

    const { getByTestId } = render(
      <NewslettersContext.Provider value={contextValue}>
        <NewslettersList />
      </NewslettersContext.Provider>
    );

    expect(getByTestId("no-newsletters-data")).toBeInTheDocument();
  });

  it("should render loading image on isLoading prop change", () => {
    const contextValue = {
      newsletters,
      isLoading: true,
      error: "",
      getNewsletterLink: jest.fn(),
      pagination: {
        limit: 10,
        page: 0,
      },
      setPagination: jest.fn(),
      totalCount: 0,
    };

    const { getByTestId } = render(
      <NewslettersContext.Provider value={contextValue}>
        <NewslettersList />
      </NewslettersContext.Provider>
    );

    expect(getByTestId("loading-image")).toBeInTheDocument();
  });

  it("should render notification on error prop change", () => {
    const contextValue = {
      newsletters,
      isLoading: false,
      error: "some error",
      getNewsletterLink: jest.fn(),
      pagination: {
        limit: 10,
        page: 0,
      },
      setPagination: jest.fn(),
      totalCount: 0,
    };

    const { getByTestId } = render(
      <NewslettersContext.Provider value={contextValue}>
        <NewslettersList />
      </NewslettersContext.Provider>
    );

    expect(getByTestId("notification")).toBeInTheDocument();
  });
});
