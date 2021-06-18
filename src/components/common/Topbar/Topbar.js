import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

import "@fontsource/quicksand/400.css";

import Button from "../Button/Button";
import { getUserData } from "../../../helpers/userFetcher";

const Topbar = () => {
  const user = getUserData();
  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      h="10vh"
      color="bright.black"
      p={5}
    >
      <Flex>
        <Text fontSize="4xl" fontWeight="medium">
          Welcome, {user.first_name} {user.last_name}
        </Text>
      </Flex>
      <Flex alignItems="center" marginRight="1.5rem">
        <IconButton icon={<FaBell />} color="bright.black" fontSize="3xl" />
        <Button
          rounded={"full"}
          variant="outline"
          text="Create New Newsletter"
          marginLeft="1.5rem"
          color="bright.black"
          borderColor="bright.black"
          fontWeight={400}
          _hover={{
            backgroundColor: "bright.black",
            color: "bright.white",
            borderColor: "bright.black",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Topbar;
