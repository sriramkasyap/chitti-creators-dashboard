import { Flex } from "@chakra-ui/react";

import Button from "../Button/Button";

import classes from "./Topbar.module.scss";

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
          className={classes.topbarButton}
          text="Create New Newsletter"
        />
      </Flex>
    </Flex>
  );
};

export default Topbar;
