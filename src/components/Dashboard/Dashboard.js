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
    <Flex flexDir="column" w="100%">
      {/* "Create New Newsletter" button display in small screen Start */}
      <Flex display={["flex", "flex", "flex", "flex", "none"]}>
        <Button
          rounded={"full"}
          variant="outline"
          text="Create New Newsletter"
          color="bright.fg"
          borderColor="bright.fg"
          fontWeight={400}
          fontSize={["lg", "lg", "xl", "2xl"]}
          p={6}
          _hover={{
            backgroundColor: "bright.fg",
            color: "bright.bg",
            borderColor: "bright.fg",
          }}
        />
      </Flex>
      {/* "Create New Newsletter" button display in small screen End */}

      {/* Dashboard Card Start */}
      <Flex
        flexDir={["column", "row"]}
        justifyContent={["unset", "unset", "space-between"]}
        flexWrap="wrap"
        mt={[5, 5, 10, 10, 0]}
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
