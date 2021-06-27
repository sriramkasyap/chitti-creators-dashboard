import { Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Heading mt={50} fontSize="6xl" alignSelf="center" letterSpacing="tight">
      {title}
    </Heading>
  );
};

export default Header;
