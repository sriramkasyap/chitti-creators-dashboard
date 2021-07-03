import { useEffect, useState } from "react";
import { withIronSession } from "next-iron-session";

import Dashboard from "../src/components/Dashboard/Dashboard";
import { NewslettersProvider } from "../contexts/NewslettersContext";

import { checkAuthentication, getIronConfig } from "../src/utils";
import { getCardsDetails } from "../src/helpers/userFetcher";

const Home = () => {
  const [cardsDetail, setCardsDetail] = useState([]); // Cards Detail
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    getCardsDetails()
      .then((data) => {
        if (data.success) {
          const {
            activeSubscribers,
            totalPaidSubscribers,
            revenue,
            newslettersSent,
          } = data;
          setCardsDetail([
            {
              id: 1,
              title: "Active Subscribers",
              total: activeSubscribers,
              icon: "user.png",
            },
            {
              id: 2,
              title: "Paid Subscribers",
              total: totalPaidSubscribers,
              icon: "user.png",
            },
            {
              id: 3,
              title: "Revenue (per month)",
              total: <span>&#x20b9;{revenue}</span>,
              icon: "money.png",
            },
            {
              id: 4,
              title: "Newsletters Sent",
              total: newslettersSent,
              icon: "envelope.png",
            },
          ]);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <NewslettersProvider>
      <Dashboard cards={cardsDetail} isLoading={loading} error={error} />
    </NewslettersProvider>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Home;
