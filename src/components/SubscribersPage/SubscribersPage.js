import { useContext, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Image,
} from "@chakra-ui/react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

import ErrorMessage from "../common/ErrorAlert/ErrorAlert";
import { AuthContext } from "../../../contexts/AuthContext";

const SubscribersPage = ({ subscribers, isLoading, error }) => {
  const { loggedInUser } = useContext(AuthContext);
  const { plans } = loggedInUser;

  const getPlan = () => {
    const planData = plans?.find((plan) => plan._id === subscribers[0].planId);
    if (planData.planFee === 0) {
      return "Free";
    }
    return "Paid";
  };

  const data = useMemo(() => {
    return subscribers[0]?.subscribers.map((subscriber) => ({
      subscriberName: subscriber.name,
      subscriberEmail: subscriber.email,
      type: getPlan(),
    }));
  }, [subscribers]);

  const columns = useMemo(
    () => [
      {
        Header: "Subscriber",
        accessor: "subscriberName",
        show: window.innerWidth > 768,
      },
      {
        Header: "Email",
        accessor: "subscriberEmail",
      },
      {
        Header: "Subscription Type",
        accessor: "type",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Flex flexDir="column" w={["", "100%"]}>
      <Flex
        flexDir="column"
        justifyContent={isLoading ? "center" : "flex-start"}
        alignItems="center"
        h="auto"
        w="100%"
        overflow="auto"
      >
        {error ? (
          <ErrorMessage message={error} />
        ) : isLoading ? (
          <Image src="loader_black.gif" h="5rem" />
        ) : (
          <Table {...getTableProps()} size={("sm", "sm", "md", "lg")}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        fontSize={["sm", "sm", "sm", "md", "lg"]}
                        p={[3, 3, 5, 5, 5]}
                      >
                        <Flex flexDir="row" alignItems="center">
                          <Text>{column.render("Header")}</Text>
                          <chakra.span fontSize="1.25rem">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <BiCaretDown aria-label="sorted descending" />
                              ) : (
                                <BiCaretUp aria-label="sorted ascending" />
                              )
                            ) : null}
                          </chakra.span>
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()} p={[3, 3, 5, 5, 5]}>
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Flex>
  );
};

export default SubscribersPage;
