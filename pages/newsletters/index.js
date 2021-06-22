import { withIronSession } from "next-iron-session";
import { Text } from "@chakra-ui/react";
import { checkAuthentication, getIronConfig } from "../../src/utils";

const Newsletters = () => {
  return <Text fontSize="6xl">Newsletters Page</Text>;
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Newsletters;
