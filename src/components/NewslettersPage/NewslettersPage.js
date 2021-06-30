import { useEffect, useMemo } from "react";
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

import { getFormattedDate, showNotification } from "../../utils";

const NewslettersPage = ({
  newsletters,
  isLoading,
  error,
  getNewsletterLink,
}) => {
  useEffect(() => {
    if (error) {
      showNotification(error);
    }
  }, [error]);

  const data = useMemo(() => {
    return newsletters.map((newsletter) => ({
      newsletterName: newsletter.reference,
      newsletterSubject: newsletter.emailSubject,
      createdDate: getFormattedDate(newsletter.createdAt),
      status: newsletter.status.toUpperCase(),
      isEditable:
        newsletter.status === "draft" ? (
          getNewsletterLink(newsletter._id)
        ) : (
          <Text>&mdash;</Text>
        ),
    }));
  }, [newsletters]);

  const columns = useMemo(
    () => [
      {
        Header: "Newsletter",
        accessor: "newsletterName",
      },
      {
        Header: "Subject",
        accessor: "newsletterSubject",
      },
      {
        Header: "Created At",
        accessor: "createdDate",
      },
      {
        Header: "Status",
        accessor: "status",
      },

      {
        Header: "Edit Newsletter",
        accessor: "isEditable",
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
      >
        {isLoading ? (
          <Image src="loader_black.gif" h="5rem" />
        ) : (
          <Table {...getTableProps()} size={("sm", "sm", "md", "lg")}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
                  ))}
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

export default NewslettersPage;
