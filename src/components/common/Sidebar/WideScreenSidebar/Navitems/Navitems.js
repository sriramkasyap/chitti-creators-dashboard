import Link from "next/link";
import PropTypes from "prop-types";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Navitems = ({ navItems }) => {
  const router = useRouter();
  const route = router.asPath;
  return (
    <Flex flexDir="column" alignItems="flex-start" justifyContent="center">
      {navItems?.length > 0 &&
        navItems.map((item) => (
          <Flex key={item.id}>
            <Link href={item.link} as={`${item.link}`}>
              <Flex
                flexDir="row"
                alignItems="center"
                color="bright.gray"
                mb={5}
                _hover={{ color: "bright.bg" }}
                cursor="pointer"
                color={route === item.link ? "bright.bg" : "bright.gray"}
              >
                <Icon as={item.icon} fontSize="xl" />
                <Text fontSize="lg" ml={4}>
                  {item.text}
                </Text>
              </Flex>
            </Link>
          </Flex>
        ))}
    </Flex>
  );
};

Navitems.propTypes = {
  navItems: PropTypes.instanceOf(Array).isRequired,
};

export default Navitems;
