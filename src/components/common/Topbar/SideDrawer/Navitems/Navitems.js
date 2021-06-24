import Link from "next/link";
import { Flex, Text, Icon } from "@chakra-ui/react";

import { getNavItems } from "../../../../../helpers/navitemsFetcher";

const Navitems = ({ onClose }) => {
  const navItems = getNavItems();
  return (
    <Flex flexDir="column" alignItems="flex-start" justifyContent="center">
      {navItems?.length > 0 &&
        navItems.map((item) => (
          <Flex key={item.id}>
            <Link href={item.link} as={`${item.link}`}>
              <Flex
                mb={25}
                flexDir="row"
                alignItems="center"
                cursor="pointer"
                onClick={onClose}
              >
                <Icon
                  as={item.icon}
                  fontSize="2xl"
                  fontWeight="medium"
                  color="bright.bg"
                />
                <Text
                  fontSize="2xl"
                  fontWeight="medium"
                  color="bright.bg"
                  ml={5}
                >
                  {item.text}
                </Text>
              </Flex>
            </Link>
          </Flex>
        ))}
    </Flex>
  );
};

export default Navitems;
