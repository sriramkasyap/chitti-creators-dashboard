import { useRouter } from "next/router";
import { Flex, Box } from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {
  const router = useRouter();
  const route = router.asPath;
  const shouldHideTopbar = route.startsWith("/newsletters/");

  return (
    <Box pl={[0, 0, 0, 0, "300px"]}>
      <Sidebar />
      <Flex w="100%" flexDir="column">
        <Topbar isTopbarDisplay={shouldHideTopbar ? "none" : "flex"} />
        <main>
          <Flex flexDir="row" p={5} overflow="auto">
            {children}
          </Flex>
        </main>
      </Flex>
    </Box>
  );
};

export default Layout;
