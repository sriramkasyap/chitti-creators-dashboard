import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "@chakra-ui/react";

import Button from "../Button/Button";
import { noop } from "../../../utils";

const Pagination = ({ limit, page, setPagination, totalCount }) => (
  <>
    <Flex w="100%" mt={10} justifyContent="space-between" alignItems="center">
      <Button
        disabled={page < 1}
        rounded="full"
        variant="outline"
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
        rounded="full"
        variant="outline"
        text="Next >"
      />
    </Flex>
  </>
);

Pagination.propTypes = {
  limit: PropTypes.number,
  page: PropTypes.number,
  totalCount: PropTypes.number,
  setPagination: PropTypes.func,
};

Pagination.defaultProps = {
  limit: 0,
  page: 0,
  totalCount: 0,
  setPagination: noop,
};

export default Pagination;
