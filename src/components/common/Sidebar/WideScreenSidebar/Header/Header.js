import { Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Heading mt={3.5} fontSize="6xl" alignSelf="center" letterSpacing="tight">
      {title}
    </Heading>
  );
};

export default Header;
