import { Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Heading
      mb={22.5}
      mt={50}
      fontSize="4.375rem"
      alignSelf="center"
      letterSpacing="tight"
    >
      {title}
    </Heading>
  );
};

export default Header;
