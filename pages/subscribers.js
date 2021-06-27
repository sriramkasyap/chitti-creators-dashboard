import { useEffect, useState } from "react";
import { withIronSession } from "next-iron-session";

import SubscribersPage from "../src/components/SubscribersPage/SubscribersPage";

import { checkAuthentication, getIronConfig } from "../src/utils";
import { getSubscribers } from "../src/helpers/userFetcher";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]); // Subscribers
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState(""); // Error message
  const [subscribersCount, setSubscribersCount] = useState(0);

  useEffect(() => {
    // Set Subscribers on first load
    getSubscribers()
      .then((data) => {
        if (data.success) {
          setSubscribers(data.subscribers);
          setSubscribersCount(data.count);
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
    <>
      {Object.keys(subscribers).length > 0 && (
        <SubscribersPage
          subscribers={subscribers}
          isLoading={loading}
          error={error}
          subscribersCount={subscribersCount}
        />
      )}
    </>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Subscribers;
