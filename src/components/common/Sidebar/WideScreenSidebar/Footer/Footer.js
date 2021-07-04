import Link from "next/link";
import { useContext } from "react";
import { Flex, Avatar, Text, Icon } from "@chakra-ui/react";

import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../../../../../contexts/AuthContext";

const Footer = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    profile: { displayPicture, fullName },
  } = loggedInUser;

  return (
    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
      <Link
        href="/profile"
        as="/profile"
        _hover={{ textDecor: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex flexDir="column" alignItems="center" cursor="pointer">
          <Avatar name={fullName} src={displayPicture} h={65} w={65} />
          <Text textAlign="center" mt={3} mb={3} fontSize="lg">
            {fullName}
          </Text>
        </Flex>
      </Link>
      <Link href="/logout" _focus={{ boxShadow: "none" }}>
        <Text
          color="bright.gray"
          _hover={{ color: "bright.bg" }}
          fontSize="sm"
          cursor="pointer"
        >
          Logout <Icon as={FiLogOut} fontSize="lg" />
        </Text>
      </Link>
    </Flex>
  );
};

export default Footer;
