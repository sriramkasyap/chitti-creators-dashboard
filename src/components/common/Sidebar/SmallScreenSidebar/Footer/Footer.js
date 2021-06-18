import { Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex mb={10} mt={5}>
      <Link>
        <Text color="bright.gray" _hover={{ color: "bright.white" }}>
          Logout
        </Text>
      </Link>
    </Flex>
  );
};

export default Footer;
