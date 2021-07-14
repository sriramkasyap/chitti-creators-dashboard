import { useRouter } from "next/router";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Button from "../src/components/common/Button/Button";

const NotFoundPage = () => {
  const router = useRouter();

  const goback = () => {
    router.replace("/");
  };

  return (
    <Box height="100vh" width="100%" display="flex" justifyContent="center">
      <Flex
        width={["100%", "100%", "70%", "60%", "50%"]}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Heading
          as="h1"
          fontSize={["9xl", "10rem", "14rem"]}
          mb={3}
          bgImage="url('/bg.jpg')"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgClip="text"
        >
          Oops!
        </Heading>
        <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase" mb={3}>
          404 - Page not Found
        </Text>
        <Text fontSize={["md", "xl"]} mb={6}>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </Text>
        <Button
          text="Go to Homepage"
          rounded="full"
          onClick={goback}
          color="bright.bg"
          backgroundColor="bright.fg"
          _hover={{
            color: "bright.bg",
            backgroundColor: "bright.fg",
          }}
          _active={{
            color: "bright.bg",
            backgroundColor: "bright.fg",
          }}
          fontWeight={500}
          textTransform="uppercase"
          p="1rem 2rem"
        />
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
