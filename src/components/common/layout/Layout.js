import { Flex } from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {
  return (
    <Flex
      h="100vh"
      flexDir="row"
      overflow="hidden"
      maxW="2000px"
      overflow={["scroll", "scroll", "scroll", "scroll", "hidden"]}
    >
      <Sidebar />
      <Flex w="100%" flexDir="column">
        <Topbar />
        <main>
          <Flex h="90vh" flexDir="row" p={5}>
            {children}
          </Flex>
        </main>
      </Flex>
    </Flex>
  );
};

export default Layout;
