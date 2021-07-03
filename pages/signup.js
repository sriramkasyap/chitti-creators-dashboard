import { useState, useContext } from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import {
  Flex,
  Heading,
  Input,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Link,
  Image,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";
import ErrorAlert from "../src/components/common/ErrorAlert/ErrorAlert";

import { AuthContext } from "../contexts/AuthContext";
import { getIronConfig } from "../src/utils";

const Signup = () => {
  const router = useRouter();
  const { loggedInUser, userSignup } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginError, userLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
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

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Password did not match");
      } else {
        await userSignup({
          fullName: formData.fullName,
          emailId: formData.emailId,
          password: formData.password,
        });
        router.replace("/");
      }
    } catch (err) {
      setError(loginError);
      setIsLoading(false);
      setFormData({
        fullName: "",
        emailId: "",
        password: "",
        confirmPassword: "",
      });
      router.replace("/signup");
    }
  };

  return (
    <Flex flexDir={["column", "column", "column", "column", "row-reverse"]}>
      <Flex
        display={["none", "none", "flex"]}
        justifyContent={["center", "center", "center", "center", "flex-end"]}
        alignItems="center"
        backgroundColor="bright.fg"
        backgroundImage="url('word_cloud.png')"
        backgroundSize="cover"
        h={["40vh", "40vh", "30vh", "40vh", "100vh"]}
        w={["100vw", "100vw", "100vw", "100vw", "70vw"]}
      >
        <Flex
          flexDir="column"
          fontSize={["2xl", "2xl", "5xl", "7xl", "6xl"]}
          alignItems={["center", "center", "center", "center", "flex-end"]}
          fontWeight="semibold"
          color="bright.bg"
          mr={[0, 0, 0, 0, 28]}
          mb={[0, 0, 0, 0, 28]}
        >
          <Text>Creating content</Text>
          <Text>has never been more</Text>
          <Text>rewarding</Text>
        </Flex>
      </Flex>
      <Flex
        h={["100vh", "100vh", "60vh"]}
        flexDir="column"
        alignItems="center"
        justifyContent={["space-evenly", "space-evenly", "unset"]}
        p={[8, 8, 8, 8, "0 6rem"]}
        w={["100vw", "100vw", "80vw", "80vw", "30vw"]}
        m={["auto", "auto", "auto", "auto", "3rem auto"]}
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
          <Text>rewarding</Text>
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
            Sign up as a Creator on
          </Text>
          <Heading color="bright" fontSize="6xl" mb={5} letterSpacing="tight">
            Chitti.
          </Heading>
          {error && <ErrorAlert message={error} />}
          <FormControl id="fullName">
            <FormLabel color="bright.fg">Full Name</FormLabel>
            <Input
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              mb={3}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormControl>

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
              mb={3}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="confirmPassword">
            <FormLabel color="bright.fg">Confirm Password</FormLabel>
            <Input
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              mb={6}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            rounded={"full"}
            text={
              isLoading ? (
                <Image src="loader_white.gif" h="2.5rem" />
              ) : (
                "Create Account"
              )
            }
            color="bright.bg"
            backgroundColor="bright.fg"
            fontWeight={400}
            onClick={handleSignup}
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
            Have an account already?
          </Text>
          <Link
            href="/login"
            _focus={{ boxShadow: "none" }}
            textDecor="underline"
            color="bright.gray"
          >
            <Text color="bright.gray" fontSize="md">
              Login
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
      standardLayout: false,
    },
  };
}, getIronConfig());

export default Signup;
