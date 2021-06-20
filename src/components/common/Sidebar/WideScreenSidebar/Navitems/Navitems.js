import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Text, Icon } from "@chakra-ui/react";

const Navitems = ({ navItems }) => {
  const router = useRouter();
  const route = router.asPath;
  return (
    <Flex flexDir="column" alignItems="flex-start" justifyContent="center">
      {navItems?.length > 0 &&
        navItems.map((item) => (
          <Flex key={item.id}>
            <Link href={item.link}>
              <Flex
                flexDir="row"
                alignItems="center"
                color="bright.gray"
                mb={8}
                _hover={{ color: "bright.bg" }}
                cursor="pointer"
                color={route === item.link ? "bright.bg" : "bright.gray"}
              >
                <Icon as={item.icon} fontSize="2xl" />
                <Text fontSize="xl" ml={4}>
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
