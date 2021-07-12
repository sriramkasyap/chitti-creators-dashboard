import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Table from "../../../../src/components/common/Table/Table";

const data = [
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

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Subscription Type",
    accessor: "subscriptionType",
  },
];

describe("Alert initial render", () => {
  it("should match the snapshot", () => {
    const container = render(
      <Table data={data} columns={columns} hiddenColumns={["name"]} size="md" />
    );

    expect(container).toMatchSnapshot();
  });
});
