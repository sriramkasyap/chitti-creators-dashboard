import { Flex, Divider } from "@chakra-ui/react";

import Header from "./Header/Header";
import Navitems from "./Navitems/Navitems";
import Footer from "./Footer/Footer";

import { getNavItems } from "../../../../helpers/navitemsFetcher";

const WideScreenSidebar = () => {
  const navItems = getNavItems(); // fetch navbar items

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <Flex flexDir="column" as="nav" w="100%">
        <Header title="Chitti." />
        <Divider w="80%" m="0 auto" border="1px" borderColor="bright.gray" />
        <Flex flexDir="row" justifyContent="center" alignItems="center" mt={22}>
          <Navitems navItems={navItems} />
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default WideScreenSidebar;
