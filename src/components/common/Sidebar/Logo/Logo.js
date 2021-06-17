import { Heading } from "@chakra-ui/react";

const Logo = ({ title }) => {
  return (
    <Heading
      mb={100}
      mt={50}
      fontSize="4xl"
      alignSelf="center"
      letterSpacing="tight"
    >
      {title}
    </Heading>
  );
};

export default Logo;
