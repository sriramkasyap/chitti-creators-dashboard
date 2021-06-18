import { Flex, Divider } from "@chakra-ui/react";

import Header from "./Header/Header";
import Navitems from "./Navitems/Navitems";
import Footer from "./Footer/Footer";

import { getUserData } from "../../../../helpers/userFetcher";

const WideScreenSidebar = () => {
  const user = getUserData();

  return (
    <Flex flexDir="column" justifyContent="space-between" h="100vh">
      <Flex flexDir="column" as="nav">
        <Header title="Chitti." />
        <Divider w={256} mb={44.5} border="1px" borderColor="bright.gray" />
        <Flex flexDir="row" justifyContent="center" alignItems="center">
          <Navitems />
        </Flex>
      </Flex>
      <Footer user={user} />
    </Flex>
  );
};

export default WideScreenSidebar;
