import { withIronSession } from "next-iron-session";
import Dashboard from "../src/components/Dashboard/Dashboard";
import { getIronConfig } from "../src/utils";

export default function Home() {
  return <Dashboard />;
}

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  if (!(req.session && req.session.get("creator"))) {
    res.setHeader("Location", "/login");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      data: null,
    },
  };
}, getIronConfig());
