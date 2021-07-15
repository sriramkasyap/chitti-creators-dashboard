import { useState, useContext, useEffect } from "react";
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
  FormErrorMessage,
  Link,
  Image,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";
import Alert from "../src/components/common/Alert/Alert";

import { AuthContext } from "../contexts/AuthContext";
import { getIronConfig, isEmpty, validateEmail } from "../src/utils";

const DEFAULT_ERRORS = {
  fullName: {
    errorStatus: false,
    errorText: "",
  },
  emailId: {
    errorStatus: false,
    errorText: "",
  },
  password: {
    errorStatus: false,
    errorText: "",
  },
  confirmPassword: {
    errorStatus: false,
    errorText: "",
  },
};

const Signup = () => {
  const router = useRouter();
  const { loginError, userSignup } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({ ...DEFAULT_ERRORS });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
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

  const handleSignup = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        if (formData.password !== formData.confirmPassword) {
          setError("Password did not match");
          setIsLoading(false);
        } else if (
          await userSignup({
            fullName: formData.fullName,
            emailId: formData.emailId,
            password: formData.password,
          })
        ) {
          setError("");
          router.replace("/");
        } else {
          setIsLoading(false);
          setFormData({
            fullName: "",
            emailId: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        setError(loginError && loginError.length > 1 ? loginError : err);
        setIsLoading(false);
        setFormData({
          fullName: "",
          emailId: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  return (
    <Flex flexDir={["column", "column", "column", "column", "row-reverse"]}>
      <Flex
        display={["none", "none", "flex"]}
        justifyContent={["center", "center", "center", "center", "flex-end"]}
        alignItems="center"
        backgroundColor="bright.fg"
        backgroundImage="url('word_cloud.png')"
        backgroundSize="contain"
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
        h={["auto", "100vh", "auto", "auto", "100vh"]}
        overflowY={["unset", "unset", "unset", "unset", "auto"]}
        flexDir="column"
        alignItems="center"
        justifyContent={["space-evenly", "space-evenly", "unset", "center"]}
        p={[8, 8, 8, 8, "0 4rem", "0 6rem"]}
        w={["100vw", "100vw", "80vw", "80vw", "30vw"]}
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
          <Text textAlign="center" color="bright.gray" fontSize="xl" mb={1.5}>
            Sign up as a Creator on
          </Text>
          <Heading
            textAlign="center"
            color="bright"
            fontSize="6xl"
            mb={5}
            letterSpacing="tight"
          >
            Chitti.
          </Heading>
          {error && <Alert message={error} status="error" />}
          <FormControl
            id="fullName"
            isInvalid={formErrors.fullName.errorStatus}
            mb={3}
          >
            <FormLabel color="bright.fg">Full Name</FormLabel>
            <Input
              data-testid="full-name"
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {formErrors.fullName.errorStatus
                ? formErrors.fullName.errorText
                : ""}
            </FormErrorMessage>
          </FormControl>

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
            mb={3}
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

          <FormControl
            id="confirmPassword"
            isInvalid={formErrors.confirmPassword.errorStatus}
            mb={6}
          >
            <FormLabel color="bright.fg">Confirm Password</FormLabel>
            <Input
              data-testid="confirm-password"
              variant="outline"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="2px solid"
              borderRadius={0}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {formErrors.confirmPassword.errorStatus
                ? formErrors.confirmPassword.errorText
                : ""}
            </FormErrorMessage>
          </FormControl>

          <Button
            data-testid="create-account"
            rounded="full"
            text={
              isLoading ? (
                <Image src="loader_white.gif" h="2.5rem" />
              ) : (
                "Create Account"
              )
            }
            color="bright.bg"
            backgroundColor="bright.fg"
            _hover={{
              color: "bright.bg",
              backgroundColor: "bright.fg",
            }}
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
