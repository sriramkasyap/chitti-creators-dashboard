import { Flex } from "@chakra-ui/react";

import WideScreenSidebar from "./WideScreenSidebar/WideScreenSidebar";

const Sidebar = () => {
  return (
    // Sidebar for Widescreen Start
    <Flex
      display={["none", "none", "none", "none", "flex"]} // display according to the breakpoints defined in theme.js
      w="300px"
      h="100vh"
      backgroundColor="bright.fg"
      color="bright.bg"
    >
      <WideScreenSidebar />
    </Flex>
    // Sidebar for Widescreen End
  );
};

export default Sidebar;
