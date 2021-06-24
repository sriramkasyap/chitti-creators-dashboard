import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Flex, Text, Icon } from "@chakra-ui/react";

const Navitems = ({ navItems }) => {
  const router = useRouter();
  const route = router.asPath;
  return (
    <Flex flexDir="column" alignItems="flex-start" justifyContent="center">
      {navItems?.length > 0 &&
        navItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Flex>
              <Link href={item.link} as={item.link}>
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
          </motion.div>
        ))}
    </Flex>
  );
};

export default Navitems;
