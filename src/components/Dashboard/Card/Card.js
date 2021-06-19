import { Box, Flex, Text } from "@chakra-ui/react";

import "@fontsource/josefin-sans/600.css";

const Card = ({ title, subtitle }) => {
  return (
    <Box
      rounded={25}
      w={["100%", 350, 350, 480, 350]}
      h={[175, 200, 175, 200, 175]}
      backgroundColor="bright.fg"
      color="bright.bg"
      mr={[0, 0, 0, 0, 5]}
      mt={5}
      flexGrow={[1, 1, 0, 0, 0]}
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
          color="bright.bg"
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
