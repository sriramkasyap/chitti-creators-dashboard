import { Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";

import Button from "../common/Button/Button";
import Card from "./Card/Card";

import { showNotification } from "../../utils";

const Dashboard = ({ cards, isLoading, error }) => {
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
      >
        {isLoading ? (
          <Image src="loader_black.gif" h="5rem" />
        ) : (
          <>
            {cards?.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </>
        )}
      </Flex>
      {/* Dashboard Card End */}
    </Flex>
  );
};

export default Dashboard;
