import { Flex, Divider } from "@chakra-ui/react";

import Header from "./Header/Header";
import Navitems from "./Navitems/Navitems";
import Footer from "./Footer/Footer";

import { getNavItems } from "../../../../helpers/navitemsFetcher";
import { getUserData } from "../../../../helpers/userFetcher";

const WideScreenSidebar = () => {
  const navItems = getNavItems(); // fetch navbar items
  const user = getUserData(); // fetch loggedin user data

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <Flex flexDir="column" as="nav">
        <Header title="Chitti." />
        <Divider mb={44.5} border="1px" borderColor="bright.gray" />
        <Flex flexDir="row" justifyContent="center" alignItems="center">
          <Navitems navItems={navItems} />
        </Flex>
      </Flex>
      <Footer user={user} />
    </Flex>
  );
};

export default WideScreenSidebar;
