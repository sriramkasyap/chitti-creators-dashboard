import { Box, Flex, Image, Text } from "@chakra-ui/react";

import "@fontsource/josefin-sans/600.css";

const Card = ({ card }) => {
  const { title, total, icon } = card;
  return (
    <Box
      rounded={25}
      w={["100%", 350, 350, 480, "23%"]}
      h={[175, 200, 175, 200, 150]}
      backgroundColor="bright.fg"
      color="bright.bg"
      mt={5}
      flexGrow={[1, 1, 0, 0, 0]}
    >
      <Flex
        flexDir="column"
        h="100%"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Flex
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Image src={icon} alt={icon} h={[90, 100, 90, 100, 75]} />
          <Text
            fontWeight="bold"
            fontSize={["5xl", "5xl", "5xl", "6xl", "5xl"]}
            color="bright.bg"
            textAlign="center"
            fontFamily="Josefin Sans"
            mr={5}
          >
            {total}
          </Text>
        </Flex>
        <Text
          color="bright.gray"
          fontSize={["2xl", "2xl", "2xl", "3xl", "2xl"]}
          fontWeight="medium"
          textAlign="center"
          mr={5}
          mb={5}
        >
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default Card;
