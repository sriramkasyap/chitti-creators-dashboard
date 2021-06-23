import { useContext } from "react";
import { Flex, Avatar, Text, Link, Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../../../../../contexts/AuthContext";

const Footer = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    creator: {
      profile: { displayPicture, fullName },
    },
  } = loggedInUser;

  return (
    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
      <Avatar name={fullName} src={displayPicture} h={75} w={75} />
      <Text textAlign="center" mt={3} mb={3} fontSize="2xl">
        {fullName}
      </Text>
      <Link href="/logout">
        <Text color="bright.gray" _hover={{ color: "bright.bg" }} fontSize="md">
          Logout <Icon as={FiLogOut} fontSize="lg" />
        </Text>
      </Link>
    </Flex>
  );
};

export default Footer;
