import Link from "next/link";
import { Flex, Text, Icon } from "@chakra-ui/react";

import classes from "./Navitems.module.scss";
import { getNavItems } from "../../../../../helpers/navitemsFetcher";

const Navitems = () => {
  const navItems = getNavItems();
  return (
    <Flex flexDir="column" alignItems="flex-start" justifyContent="center">
      {/* <Flex className={classes.sidebarItem}>
        <Link href="/">
          <a>
            <Icon as={FiHome} fontSize="2xl" className={classes.activeIcon} />
            <Text className={classes.active}>Home</Text>
          </a>
        </Link>
      </Flex> */}

      {navItems?.length > 0 &&
        navItems.map((item) => (
          <Flex key={item.id} className={classes.sidebarItem}>
            <Link href={item.link}>
              <a>
                <Icon as={item.icon} fontSize="2xl" />
                <Text fontSize="xl">{item.text}</Text>
              </a>
            </Link>
          </Flex>
        ))}
    </Flex>
  );
};

export default Navitems;
