import Link from "next/link";
import { withIronSession } from "next-iron-session";
import { Text } from "@chakra-ui/react";

import NewslettersPage from "../../src/components/NewslettersPage/NewslettersPage";

import { checkAuthentication, getIronConfig } from "../../src/utils";
import { useEffect, useState } from "react";
import { getNewsletters } from "../../src/helpers/userFetcher";

const Newsletters = () => {
  var [newsletters, setNewsletters] = useState([]); // Newsletters
  var [loading, setLoading] = useState(true); // Loading State
  var [error, setError] = useState(""); // Error message
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    // Pagination State
    limit: 10,
    page: 0,
  });

  useEffect(() => {
    // Set newsletters on first load
    getNewsletters({ ...pagination })
      .then((data) => {
        if (data.success) {
          setNewsletters(data.newsletters);
          setTotalCount(data.totalCount);
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
  }, [pagination]);

  const getNewsletterLink = (newsletterId) => {
    // Get link component for Editing newsletter
    return (
      <Link
        prefetch={false}
        href={`/newsletters/[newsletterId]`}
        as={`/newsletters/${newsletterId}`}
      >
        Edit
      </Link>
    );
  };

  return (
    <NewslettersPage
      newsletters={newsletters}
      isLoading={loading}
      error={error}
      getNewsletterLink={getNewsletterLink}
      pagination={pagination}
      setPagination={setPagination}
      totalCount={totalCount}
    />
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Newsletters;
