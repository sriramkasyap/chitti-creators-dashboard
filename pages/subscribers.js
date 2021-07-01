import { useEffect, useState } from "react";
import { withIronSession } from "next-iron-session";

import SubscribersPage from "../src/components/SubscribersPage/SubscribersPage";

import { checkAuthentication, getIronConfig } from "../src/utils";
import { getSubscribers } from "../src/helpers/userFetcher";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]); // Subscribers
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState(""); // Error message
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    limit: 15,
    page: 0,
  });

  useEffect(
    (prev) => {
      // Set Subscribers on first load
      setLoading(true);
      getSubscribers(pagination)
        .then((data) => {
          if (data.success) {
            setSubscribers(data.subscribers);
            setTotalCount(data.totalCount);
            if (
              pagination.page !== data.page ||
              pagination.limit !== data.limit
            ) {
              setPagination({
                limit: data.limit,
                page: data.page,
              });
            }
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
    },
    [pagination]
  );

  return (
    <>
      {Object.keys(subscribers).length > 0 && (
        <SubscribersPage
          subscribers={subscribers}
          isLoading={loading}
          error={error}
          totalCount={totalCount}
          pagination={pagination}
          setPagination={setPagination}
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
