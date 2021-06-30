import { Flex } from "@chakra-ui/react";

import Button from "../common/Button/Button";
import Card from "./Card/Card";

const Dashboard = ({ cards, isLoading, error }) => {
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
        justifyContent={[
          "unset",
          "unset",
          "space-between",
          "space-between",
          "space-between",
        ]}
        flexWrap="wrap"
        mt={[0, 5, 5, 5, 0]}
      >
        {cards?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </Flex>
      {/* Dashboard Card End */}
    </Flex>
  );
};

export default Dashboard;
