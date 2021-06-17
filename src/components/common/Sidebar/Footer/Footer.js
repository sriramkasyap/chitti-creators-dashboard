import { Flex, Avatar, Text, Link, Icon } from "@chakra-ui/react";

import { FiLogOut } from "react-icons/fi";

const Footer = ({ user }) => {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
      <Avatar name={fullName} src={user.profile_image} />
      <Text textAlign="center" mt={3} mb={3}>
        {fullName}
      </Text>
      <Link _hover={{ textDecor: "none" }}>
        <Text color="bright.gray" _hover={{ color: "bright.white" }}>
          Sign Out <Icon as={FiLogOut} fontSize="2xl" />
        </Text>
      </Link>
    </Flex>
  );
};

export default Footer;
