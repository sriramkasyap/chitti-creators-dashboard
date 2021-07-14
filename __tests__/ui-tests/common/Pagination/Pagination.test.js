import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Pagination from "../../../../src/components/common/Pagination/Pagination";

let container;

afterEach(cleanup);

describe("Pagination initial render", () => {
  it("should match the snapshot", () => {
    const mockSetPagination = jest.fn();
    container = render(
      <Pagination
        limit={10}
        page={0}
        setPagination={mockSetPagination}
        totalCount={40}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Pagination render buttons", () => {
  it("should render next and prev buttons", () => {
    const mockSetPagination = jest.fn();
    const { getByTestId } = render(
      <Pagination
        limit={10}
        page={0}
        setPagination={mockSetPagination}
        totalCount={40}
      />
    );

    expect(getByTestId("prev-btn")).toBeInTheDocument();
    expect(getByTestId("next-btn")).toBeInTheDocument();
  });

  it("should check button clicks", () => {
    const mockSetPagination = jest.fn();

    const { getByTestId } = render(
      <Pagination
        limit={10}
        page={0}
        setPagination={mockSetPagination}
        totalCount={40}
      />
    );

    fireEvent.click(getByTestId("next-btn"));
    expect(mockSetPagination).toBeCalledTimes(1);

    fireEvent.click(getByTestId("prev-btn"));
    expect(mockSetPagination).toBeCalledTimes(1);
  });
});

describe("Pagination render on props change", () => {
  it("should render proper page number", () => {
    const mockSetPagination = jest.fn();

    const { getByText } = render(
      <Pagination
        limit={5}
        page={0}
        setPagination={mockSetPagination}
        totalCount={40}
      />
    );
    expect(getByText("Page 1 of 8")).toBeInTheDocument();
  });
});
