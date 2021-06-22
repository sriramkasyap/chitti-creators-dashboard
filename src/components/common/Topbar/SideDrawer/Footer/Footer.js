import { Flex, Text, Link, IconButton } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

const Footer = ({ onClose }) => {
  return (
    <Flex
      w="100%"
      mb={5}
      mt={5}
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/logout">
        <Text color="bright.gray" _hover={{ color: "bright.bg" }}>
          Logout
        </Text>
      </Link>
      <IconButton
        icon={<FiX />}
        color="bright.gray"
        fontSize="3xl"
        onClick={onClose}
      />
    </Flex>
  );
};

export default Footer;
