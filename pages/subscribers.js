import { withIronSession } from "next-iron-session";
import { Text } from "@chakra-ui/react";
import { checkAuthentication, getIronConfig } from "../src/utils";
import { getSubscribers } from "../src/helpers/userFetcher";
import { useEffect, useState } from "react";

const Subscribers = () => {
  var [subscribers, setSubscribers] = useState([]); // Subscribers
  var [loading, setLoading] = useState(true); // Loading State
  var [error, setError] = useState(""); // Error message

  useEffect(() => {
    // Set Subscribers on first load
    getSubscribers()
      .then((data) => {
        if (data.success) {
          setSubscribers(data.subscribers);
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

  return <Text fontSize="6xl">Subscribers Page</Text>;
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Subscribers;
