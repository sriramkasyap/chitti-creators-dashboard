import { useContext } from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";
import "@fontsource/josefin-sans/400.css";

import { AuthContext } from "../../../../../../contexts/AuthContext";

const Header = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    creator: {
      profile: { displayPicture, fullName },
    },
  } = loggedInUser;
  const nameArr = fullName.split(" ");
  const firstName = nameArr[0];
  const lastName = nameArr[1];

  return (
    <Flex flexDir="row" alignItems="center" mb={10} mt={5}>
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
          {firstName}
        </Text>
        <Text
          textAlign="center"
          fontSize="md"
          fontFamily="Josefin Sans"
          color="bright.light"
        >
          {lastName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
