import { useContext, useEffect, useMemo } from "react";
import { Flex, Text, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

import Table from "../common/Table/Table";
import Pagination from "../common/Pagination/Pagination";

import { getFormattedDate, showNotification } from "../../utils";
import { NewslettersContext } from "../../../contexts/NewslettersContext";

const NewslettersList = () => {
  const {
    newsletters,
    isLoading,
    error,
    getNewsletterLink,
    pagination,
    setPagination,
    totalCount,
  } = useContext(NewslettersContext);

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

  return (
    <Flex flexDir="column" w={["", "100%"]}>
      {newsletters && newsletters.length > 0 ? (
        <Flex
          flexDir="column"
          justifyContent={isLoading ? "center" : "flex-start"}
          alignItems="center"
          h="auto"
          w="100%"
        >
          {isLoading ? (
            <Image
              data-testid="loading-image"
              src="loader_black.gif"
              h="5rem"
            />
          ) : (
            <Table
              columns={columns}
              data={data}
              size={("sm", "sm", "md", "lg")}
            />
          )}

          {totalCount > newsletters.length && (
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
            <Text data-testid="no-newsletters-data" color="bright.gray">
              You haven&apos;t created any newsletters yet.{" "}
              <Link href="/newsletters/new" as="/newsletters/new">
                <ChakraLink textDecor="underline">Create One now.</ChakraLink>
              </Link>
            </Text>
          )}
        </>
      )}
    </Flex>
  );
};

export default NewslettersList;
