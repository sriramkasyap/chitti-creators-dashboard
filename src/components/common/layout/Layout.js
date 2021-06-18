import { Flex } from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {
  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Sidebar />
      <Flex w="82%" flexDir="column" justifyContent="space-between">
        <Topbar />
        <main>
          <Flex
            h="80vh"
            flexDir="row"
            justifyContent="space-between"
            alignItems="flex-start"
            p={5}
          >
            {children}
          </Flex>
        </main>
      </Flex>
    </Flex>
  );
};

export default Layout;
