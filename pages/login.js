import { useState, useContext } from "react";
import { Flex, Heading, Input, Text, Divider } from "@chakra-ui/react";

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
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDir="column"
        backgroundColor="bright.bg"
        p={12}
        rounded={6}
        justifyContent="center"
        alignItems="center"
      >
        <Text color="bright.gray" fontSize="xl" mb={1.5}>
          Login to
        </Text>
        <Heading color="bright" fontSize="6xl">
          Chitti.
        </Heading>
        <Divider mb={44.5} border="1px" borderColor="bright.gray" />
        <Input
          placeholder="Email"
          variant="filled"
          mb={3}
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          variant="filled"
          mb={6}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          rounded={"full"}
          text="Login"
          color="bright.bg"
          backgroundColor="bright.fg"
          fontWeight={400}
          onClick={handleLogin}
        />
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
