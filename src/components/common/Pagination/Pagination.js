import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Button from "../Button/Button";

const Pagination = ({ limit, page, setPagination, totalCount }) => {
  return (
    <>
      <Flex w="100%" mt={10} justifyContent="space-between">
        <Button
          disabled={page < 1}
          rounded={"full"}
          variant={"outline"}
          text="< Previous"
          onClick={() => {
            setPagination({
              limit,
              page: page - 1,
            });
          }}
        />
        <Text>
          Page {page + 1} of {Math.ceil(totalCount / limit)}
        </Text>
        <Button
          onClick={() => {
            setPagination({
              limit,
              page: page + 1,
            });
          }}
          disabled={page >= Math.floor(totalCount / limit)}
          rounded={"full"}
          variant={"outline"}
          text="Next >"
        />
      </Flex>
    </>
  );
};

export default Pagination;
