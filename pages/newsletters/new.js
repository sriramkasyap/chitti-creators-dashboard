import { withIronSession } from "next-iron-session";
import { checkAuthentication, getIronConfig } from "../../src/utils";
import { Text } from "@chakra-ui/react";

export default function CreateNewsLetter() {
  return <></>;
}

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);
