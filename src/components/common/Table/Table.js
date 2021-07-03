import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";
import {
  Flex,
  Text,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Table = ({ columns, data, hiddenColumns, size }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    if (hiddenColumns) {
      setHiddenColumns(hiddenColumns);
    }
  }, [hiddenColumns]);

  return (
    <ChakraTable {...getTableProps()} size={size}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
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
    </ChakraTable>
  );
};

Table.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  hiddenColumns: PropTypes.instanceOf(Array),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

Table.defaultProps = {
  hiddenColumns: [],
  size: "md",
};

export default Table;
