import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {
  const router = useRouter();
  const route = router.asPath;
  const isHideTopbar =
    route === "/newsletters/new" || route === "/newsletters/[newsletterId]";

  return (
    <Flex
      h="100vh"
      flexDir="row"
      overflow="hidden"
      overflow={["scroll", "scroll", "scroll", "scroll", "hidden"]}
    >
      <Sidebar />
      <Flex w="100%" flexDir="column">
        <Topbar isTopbarDisplay={isHideTopbar ? "none" : "flex"} />
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
