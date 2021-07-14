import PropTypes from "prop-types";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";

import "@fontsource/josefin-sans/600.css";

const Card = ({ card, isLoading }) => {
  const { title, total, icon } = card;
  return (
    <Box
      data-testid="card"
      rounded={25}
      w={["100%", "100%", 350, 480, 350]}
      h={[125, 150, 160, 180, 180]}
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
            <Skeleton isLoaded={!isLoading}>{total}</Skeleton>
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
          <Skeleton isLoaded={!isLoading}>{title}</Skeleton>
        </Text>
      </Flex>
    </Box>
  );
};

Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool,
};

Card.defaultProps = {
  isLoading: false,
};

export default Card;
