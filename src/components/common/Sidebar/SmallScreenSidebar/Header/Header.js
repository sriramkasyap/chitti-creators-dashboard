import { Flex, Avatar, Text } from "@chakra-ui/react";
import "@fontsource/josefin-sans/400.css";

const Header = ({ user }) => {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <Flex flexDir="row" alignItems="center" mb={10} mt={5}>
      <Flex>
        <Avatar name={fullName} src={user.profile_image} h={45} w={45} />
      </Flex>
      <Flex flexDir="column" alignItems="flex-start" ml={15}>
        <Text
          textAlign="center"
          fontSize="md"
          fontFamily="Josefin Sans"
          color="bright.white"
        >
          {user.first_name}
        </Text>
        <Text
          textAlign="center"
          fontSize="md"
          fontFamily="Josefin Sans"
          color="bright.white"
        >
          {user.last_name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
