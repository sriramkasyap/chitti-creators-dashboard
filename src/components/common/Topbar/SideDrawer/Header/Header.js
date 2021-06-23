import { Flex, Avatar, Text } from "@chakra-ui/react";
import "@fontsource/josefin-sans/400.css";
import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";

const Header = ({ user }) => {
  const {
    loggedInUser: {
      profile: { fullName, displayPicture },
    },
  } = useContext(AuthContext);

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
          {fullName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
