import { Box, Flex, Text } from "@chakra-ui/react";

import "@fontsource/josefin-sans/600.css";

const Card = ({ title, subtitle }) => {
  return (
    <Box
      rounded={25}
      w={350}
      h={175}
      backgroundColor="bright.black"
      color="bright.white"
    >
      <Flex
        p={5}
        flexDir="column"
        h="100%"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Text
          fontWeight="bold"
          fontSize="6xl"
          color="bright.white"
          textAlign="center"
          fontFamily="Josefin Sans"
        >
          {subtitle}
        </Text>
        <Text
          color="bright.gray"
          fontSize="3xl"
          fontWeight="medium"
          textAlign="center"
        >
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default Card;
