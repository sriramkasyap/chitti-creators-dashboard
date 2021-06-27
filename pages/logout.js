import { withIronSession } from "next-iron-session";
import { getIronConfig } from "../src/utils";

const Logout = () => {
  return <></>;
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  if (req.session) req.session.destroy();

  res.setHeader("Location", "/login");
  res.statusCode = 302;
  res.end();

  return {
    props: { standardLayout: false },
  };
}, getIronConfig());

export default Logout;
