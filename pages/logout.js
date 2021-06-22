import { withIronSession } from "next-iron-session";
import { getIronConfig } from "../src/utils";

const Logout = () => {
  return <></>;
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  if (req.session) req.session.destroy();

  res.setHeader("Location", "/login");
  res.statusCode = 302;
  return res.end();
}, getIronConfig());

export default Logout;
