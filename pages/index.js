import { withIronSession } from "next-iron-session";

import Dashboard from "../src/components/Dashboard/Dashboard";
import { checkAuthentication, getIronConfig } from "../src/utils";

export default function Home() {
  return <Dashboard />;
}

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);
