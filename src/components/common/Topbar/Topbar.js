import { Flex } from "@chakra-ui/react";

import Button from "../Button/Button";

const Topbar = () => {
  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent="flex-end"
      h="10vh"
      color="bright.black"
      boxShadow="0 3px 5px rgba(32, 32, 32, 0.3)"
    >
      <Flex alignItems="center" marginRight="1.5rem">
        <Button
          rounded={"full"}
          variant="outline"
          text="Create New Newsletter"
          marginLeft="1.5rem"
          color="bright.black"
          borderColor="bright.black"
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
