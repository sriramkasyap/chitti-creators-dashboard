import Link from "next/link";
import { useContext } from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";

import "@fontsource/josefin-sans/400.css";

import { AuthContext } from "../../../../../../contexts/AuthContext";

const Footer = ({ onClose }) => {
  const {
    loggedInUser: {
      profile: { fullName, displayPicture },
    },
  } = useContext(AuthContext);
  return (
    <Flex
      w="100%"
      mb={5}
      mt={5}
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Flex mb={5}>
        <Link
          href="profile"
          as={`/profile`}
          _hover={{ textDecor: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex flexDir="row" alignItems="center" onClick={onClose}>
            <Flex>
              <Avatar name={fullName} src={displayPicture} h={45} w={45} />
            </Flex>
            <Flex flexDir="column" alignItems="flex-start" ml={15}>
              <Text
                textAlign="center"
                fontSize="md"
                fontFamily="Josefin Sans"
                color="bright.light"
              >
                {fullName}
              </Text>
            </Flex>
          </Flex>
        </Link>
      </Flex>
      <Flex>
        <Link href="logout" as={`/logout`} _focus={{ boxShadow: "none" }}>
          <Text color="bright.gray" _hover={{ color: "bright.bg" }}>
            Logout
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
