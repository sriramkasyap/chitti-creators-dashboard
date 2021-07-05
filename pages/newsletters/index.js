import { withIronSession } from "next-iron-session";

import NewslettersList from "../../src/components/NewslettersList/NewslettersList";

import { NewslettersProvider } from "../../contexts/NewslettersContext";
import { checkAuthentication, getIronConfig } from "../../src/utils";

const Newsletters = () => {
  return (
    <NewslettersProvider>
      <NewslettersList />
    </NewslettersProvider>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Newsletters;
