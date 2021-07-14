import { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Heading, Image } from "@chakra-ui/react";

import Card from "./Card/Card";
import NewslettersList from "../NewslettersList/NewslettersList";

import { showNotification } from "../../utils";

const Dashboard = ({ isLoading, error, cards }) => {
  useEffect(() => {
    if (error) {
      showNotification(error);
    }
  }, [error]);

  return (
    <Flex flexDir="column" w="100%" alignItems={["unset", "center"]}>
      {/* Dashboard Card Start */}
      <Flex
        flexDir={["column", "row"]}
        justifyContent={["unset", "unset", "space-between"]}
        flexWrap="wrap"
        alignItems="center"
        w="100%"
      >
        {isLoading ? (
          <Image data-testid="loading_image" src="loader_black.gif" h="5rem" />
        ) : (
          <>
            {cards?.map((card) => (
              <Card key={card.id} card={card} isLoading={isLoading} />
            ))}
          </>
        )}
      </Flex>
      {/* Dashboard Card End */}

      {/* Newsletters List Start */}
      <Flex flexDir="column" mt={10} w="100%">
        <Flex>
          <Heading mt={10} mb={5}>
            Newsletters List
          </Heading>
        </Flex>
        <Flex w="100%" overflow="auto">
          <NewslettersList />
        </Flex>
      </Flex>
      {/* Newsletters List End */}
    </Flex>
  );
};

Dashboard.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  cards: PropTypes.instanceOf(Array),
};

Dashboard.defaultProps = {
  isLoading: false,
  error: "",
  cards: [],
};

export default Dashboard;
