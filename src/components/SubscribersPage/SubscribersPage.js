import { useContext, useEffect, useMemo } from "react";
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

import { AuthContext } from "../../../contexts/AuthContext";
import Pagination from "../common/Pagination/Pagination";

const SubscribersPage = ({
  subscribers,
  isLoading,
  error,
  totalCount,
  pagination,
  setPagination,
}) => {
  const { loggedInUser } = useContext(AuthContext);
  // const { plans } = loggedInUser;


  useEffect(() => {
    if (error) {
      showNotification(error);
    }
  }, [error]);

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({ columns, data: subscribers }, useSortBy);

  useEffect(() => {
    if (window.innerWidth < 768) setHiddenColumns(["subscriberName"]); // Hide Subscriber name if the window size is less than 768px
  }, []);

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
        {isLoading ? (
          <Image src="loader_black.gif" h="5rem" />
        ) : (
          <Table {...getTableProps()} size="sm">
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
                        p={[3, 3, 4, 4, 4]}
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
                        <Td {...cell.getCellProps()} p={[3, 3, 3, 3, 3]}>
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

        {totalCount > subscribers.length ? (
          <Pagination
            {...pagination}
            totalCount={totalCount}
            setPagination={setPagination}
          />
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default SubscribersPage;
