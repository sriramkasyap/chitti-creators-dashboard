import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { withIronSession } from "next-iron-session";
import {
  Flex,
  Heading,
  Input,
  Text,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  Image,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";
import Alert from "../src/components/common/Alert/Alert";

import { AuthContext } from "../contexts/AuthContext";
import { getIronConfig, isEmpty, validateEmail } from "../src/utils";

const DEFAULT_ERRORS = {
  emailId: {
    errorStatus: false,
    errorText: "",
  },
  password: {
    errorStatus: false,
    errorText: "",
  },
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ ...DEFAULT_ERRORS });
  const { loginError, userLogin, loggedInUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const validate = () => {
    const errorsObj = { ...formErrors };
    const errorKeys = Object.keys(DEFAULT_ERRORS);

    errorKeys.forEach((errorKey) => {
      if (isEmpty(formData[errorKey])) {
        errorsObj[errorKey].errorStatus = true;
        errorsObj[errorKey].errorText = "This Field is Required!";
      }
    });

    setFormErrors((prevState) => ({ ...prevState, ...errorsObj }));

    if (
      Object.keys(errorsObj).every(
        (key) => errorsObj[key].errorStatus === false
      )
    ) {
      return true;
    }

    return false;
  };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "emailId") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: {
          errorStatus: !validateEmail(value),
          errorText: "Invalid Email",
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: { errorStatus: false, errorText: "" },
      });
    }
  };

  const handleLogin = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        if (await userLogin(formData)) {
          router.replace("/");
        } else {
          setIsLoading(false);
          setFormData({
            emailId: "",
            password: "",
          });
        }
      } catch (err) {
        setIsLoading(false);
        setFormData({
          emailId: "",
          password: "",
        });
      }
    }
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (loggedInUser && loggedInUser._id) router.push("/");
  }, [loggedInUser]);

  return (
    <Flex flexDir={["column", "column", "column", "column", "row-reverse"]}>
      <Flex
        display={["none", "none", "flex"]}
        justifyContent={["center", "center", "center", "center", "flex-end"]}
        alignItems="center"
        backgroundColor="bright.fg"
        backgroundImage="url('word_cloud.png')"
        backgroundSize="cover"
        h={["40vh", "40vh", "40vh", "40vh", "100vh"]}
        w={["100vw", "100vw", "100vw", "100vw", "70vw"]}
      >
        <Flex
          flexDir="column"
          fontSize={["2xl", "2xl", "6xl", "7xl", "6xl"]}
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
        m={["auto", "auto", "auto", "auto", "6rem auto"]}
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
            Login to
          </Text>
          <Heading color="bright" fontSize="6xl" mb={5} letterSpacing="tight">
            Chitti.
          </Heading>
          {error && <Alert message={error} status="error" />}
          <FormControl
            id="email"
            isInvalid={formErrors.emailId.errorStatus}
            mb={3}
          >
            <FormLabel color="bright.fg">Email address</FormLabel>
            <Input
              data-testid="email"
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {formErrors.emailId.errorStatus
                ? formErrors.emailId.errorText
                : ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="password"
            isInvalid={formErrors.password.errorStatus}
            mb={6}
          >
            <FormLabel color="bright.fg">Password</FormLabel>
            <Input
              data-testid="password"
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {formErrors.password.errorStatus
                ? formErrors.password.errorText
                : ""}
            </FormErrorMessage>
          </FormControl>

          <Button
            data-testid="login-button"
            rounded="full"
            text={
              isLoading ? <Image src="loader_white.gif" h="2.5rem" /> : "Login"
            }
            color="bright.bg"
            backgroundColor="bright.fg"
            _hover={{
              color: "bright.bg",
              backgroundColor: "bright.fg",
            }}
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
          <Link
            href="/signup"
            _focus={{ boxShadow: "none" }}
            textDecor="underline"
            color="bright.gray"
          >
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
      standardLayout: false,
    },
  };
}, getIronConfig());

export default Login;
