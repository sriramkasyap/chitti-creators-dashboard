import React from "react";
import PropTypes from "prop-types";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import { noop } from "../../../utils";

const Pagination = ({ limit, page, setPagination, totalCount }) => (
  <Flex w="100%" mt={10} justifyContent="space-between" alignItems="center">
    <IconButton
      aria-label="Previous Page"
      data-testid="prev-btn"
      disabled={page < 1}
      fontSize="2xl"
      size="lg"
      variant="ghost"
      rounded="full"
      icon={<GrLinkPrevious />}
      onClick={() => {
        setPagination({
          limit,
          page: page - 1,
        });
      }}
      _focus={{ boxShadow: "none" }}
    />
    <Text>
      Page {page + 1} of {Math.ceil(totalCount / limit)}
    </Text>
    <IconButton
      aria-label="Next Page"
      data-testid="next-btn"
      disabled={page >= Math.floor(totalCount / limit)}
      fontSize="2xl"
      size="lg"
      variant="ghost"
      rounded="full"
      icon={<GrLinkNext />}
      onClick={() => {
        setPagination({
          limit,
          page: page + 1,
        });
      }}
      _focus={{ boxShadow: "none" }}
    />
  </Flex>
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
