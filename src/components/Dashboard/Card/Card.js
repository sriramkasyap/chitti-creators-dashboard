import { Box, Flex, Image, Text } from "@chakra-ui/react";

import "@fontsource/josefin-sans/600.css";

const Card = ({ card }) => {
  const { title, total, icon } = card;
  return (
    <Box
      rounded={25}
      flex={["auto", "100%", "50%", "50%", "350px"]}
      h={[125, 150, 160, 180, 180]}
      backgroundColor="bright.fg"
      color="bright.bg"
      mr={[5, 5, 5, 5, 6]}
      mb={[5, 5, 5, 5, 6]}
      maxW={["100%", "390px", "390px", "390px", "350px"]}
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
          alignItems="flex-start"
          w="100%"
        >
          <Image src={icon} alt={icon} h={[65, 75, 85, 100, 90]} />
          <Text
            fontWeight="bold"
            fontSize={["5xl", "5xl", "5xl", "6xl", "6xl"]}
            color="bright.bg"
            textAlign="center"
            fontFamily="Josefin Sans"
            alignSelf="center"
            mr={5}
            mt={4}
            lineHeight={1}
          >
            {total}
          </Text>
        </Flex>
        <Text
          color="bright.gray"
          fontSize={["xl", "2xl", "2xl", "3xl", "2xl"]}
          fontWeight="medium"
          textAlign="center"
          mr={5}
          mb={[3, 3, 3, 3, 5]}
        >
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default Card;
