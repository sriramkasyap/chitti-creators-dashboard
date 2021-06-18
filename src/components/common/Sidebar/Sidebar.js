import { Flex } from "@chakra-ui/react";

import WideScreenSidebar from "./WideScreenSidebar/WideScreenSidebar";
import SmallScreenSidebar from "./SmallScreenSidebar/SmallScreenSidebar";

const Sidebar = () => {
  return (
    <Flex
      w="18%"
      flexDir="column"
      alignItems="center"
      backgroundColor="bright.black"
      color="bright.white"
    >
      <Flex
        display={["none", "none", "none", "none", "flex"]}
        flexDir="column"
        justifyContent="space-between"
        h="100vh"
      >
        <WideScreenSidebar />
      </Flex>
      <Flex display={["flex", "flex", "flex", "flex", "none"]}>
        <SmallScreenSidebar />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
