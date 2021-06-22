import { useState, useContext } from "react";
import {
  Flex,
  Heading,
  Input,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Link,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";
import { AuthContext } from "../contexts/AuthContext";
import { withIronSession } from "next-iron-session";
import { getIronConfig } from "../src/utils";

const Login = () => {
  const { loggedInUser, userLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    await userLogin(formData);
    window.location = "/";
  };

  return (
    <Flex flexDir="column">
      <Flex
        display={["none", "none", "flex"]}
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        fontSize={["2xl", "2xl", "6xl"]}
        fontWeight="semibold"
        color="bright.bg"
        backgroundColor="bright.fg"
        backgroundImage="url('word_cloud.png')"
        backgroundSize="cover"
        h="40vh"
      >
        <Text>Creating content</Text>
        <Text>has never been more</Text>
        <Text> rewarding</Text>
      </Flex>
      <Flex
        h="100vh"
        flexDir="column"
        alignItems="center"
        justifyContent={["space-evenly", "space-evenly", "unset"]}
        p={8}
        w={["100vw", "100vw", "80vw"]}
        m="auto"
      >
        <Flex
          display={["flex", "flex", "none"]}
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          fontSize={["2xl", "2xl", "4xl"]}
          fontWeight="semibold"
          color="bright.fg"
        >
          <Text>Creating content</Text>
          <Text>has never been more</Text>
          <Text> rewarding</Text>
        </Flex>
        <Divider
          display={["flex", "flex", "none"]}
          width="100%"
          borderColor="bright.gray"
        />
        <Flex
          w="100%"
          flexDir="column"
          backgroundColor="bright.bg"
          rounded={6}
          justifyContent="center"
          alignItems="center"
          mt={[0, 0, 5]}
        >
          <Text color="bright.gray" fontSize="xl" mb={1.5}>
            Login to
          </Text>
          <Heading color="bright" fontSize="6xl" mb={5}>
            Chitti.
          </Heading>
          <FormControl id="email">
            <FormLabel color="bright.fg">Email address</FormLabel>
            <Input
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              mb={3}
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel color="bright.fg">Password</FormLabel>
            <Input
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              mb={6}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            rounded={"full"}
            text="Login"
            color="bright.bg"
            backgroundColor="bright.fg"
            fontWeight={400}
            onClick={handleLogin}
            p="1rem 2rem"
          />
        </Flex>
        <Flex
          flexDir="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
          mt={[0, 0, 5]}
          mb={[0, 0, 5]}
        >
          <Divider borderColor="bright.gray" />
          <Text ml={2} mr={2}>
            or
          </Text>
          <Divider borderColor="bright.gray" />
        </Flex>
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Text color="bright.gray" fontWeight="medium">
            Don’t have an account yet?
          </Text>
          <Link href="/signup" textDecor="underline">
            <Text color="bright.gray" fontSize="md">
              Sign up
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  if (req.session && req.session.get("creator")) {
    res.setHeader("Location", "/");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      data: null,
    },
  };
}, getIronConfig());

export default Login;
