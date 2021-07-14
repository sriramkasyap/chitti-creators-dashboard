import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Flex, Image, Text, Link as ChakraLink } from "@chakra-ui/react";

import Link from "next/link";
import Table from "../common/Table/Table";
import Pagination from "../common/Pagination/Pagination";

import { debounce, noop, showNotification } from "../../utils";

const SubscribersList = ({
  isLoading,
  error,
  totalCount,
  subscribers,
  pagination,
  setPagination,
}) => {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1080
  );

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

  useEffect(() => {
    // set viewport width on resize of the window
    if (typeof window !== "undefined") {
      const debouncedHandleResize = debounce(() => {
        setViewportWidth(window.innerWidth);
      }, 150);
      window.addEventListener("resize", debouncedHandleResize);
      return () => {
        window.removeEventListener("resize", debouncedHandleResize);
      };
    }
  });

  useEffect(() => {
    // Hide Subscriber name if the window size is less than 768px
    if (viewportWidth < 768) {
      setHiddenColumns(["name"]);
    } else {
      setHiddenColumns([]);
    }
  }, [viewportWidth]);

  return (
    <Flex flexDir="column" w={["", "100%"]}>
      {subscribers && subscribers.length > 0 ? (
        <Flex
          flexDir="column"
          justifyContent={isLoading ? "center" : "flex-start"}
          alignItems="center"
          h="auto"
          w="100%"
          overflow="auto"
        >
          {isLoading ? (
            <Image
              data-testid="loading-image"
              src="/loader_black.gif"
              h="5rem"
            />
          ) : (
            <Table
              columns={columns}
              data={subscribers}
              hiddenColumns={hiddenColumns}
              size={("sm", "md")}
            />
          )}

          {totalCount > subscribers.length && (
            <Pagination
              {...pagination}
              totalCount={totalCount}
              setPagination={setPagination}
            />
          )}
        </Flex>
      ) : (
        <>
          {!isLoading && (
            <Text data-testid="no-subscribers-data" color="bright.gray">
              You don&apos;t have any subscribers yet.{" "}
              <Link href="/profile" as="/profile">
                <ChakraLink textDecor="underline">
                  Complete your Profile
                </ChakraLink>
              </Link>{" "}
              and{" "}
              <Link href="/newsletters/new" as="/newsletters/new">
                <ChakraLink textDecor="underline">Start writing now</ChakraLink>
              </Link>
            </Text>
          )}
        </>
      )}
    </Flex>
  );
};

SubscribersList.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  totalCount: PropTypes.number,
  subscribers: PropTypes.instanceOf(Array),
  pagination: PropTypes.instanceOf(Object),
  setPagination: PropTypes.func,
};

SubscribersList.defaultProps = {
  isLoading: false,
  error: "",
  totalCount: 0,
  subscribers: [],
  pagination: {},
  setPagination: noop,
};

export default SubscribersList;
