import { withIronSession } from "next-iron-session";
import { getIronConfig } from "../src/utils";

const Logout = () => {
  return <></>;
};

export const getServerSideProps = withIronSession(async ({ req }) => {
  if (req.session) await req.session.destroy();

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}, getIronConfig());

export default Logout;
