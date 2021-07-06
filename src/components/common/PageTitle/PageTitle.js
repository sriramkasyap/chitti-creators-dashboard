import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Heading, Text } from "@chakra-ui/react";

const PageTitle = ({ display, pt }) => {
  const [pageTitle, setPageTitle] = useState("");
  const router = useRouter();
  const route = router.asPath;

  useEffect(() => {
    if (route) {
      const tempTitle = `My ${route.replace("/", "")}`;
      setPageTitle(tempTitle);
    }
  }, [route]);

  return (
    <Heading
      as="h2"
      size="xl"
      pt={pt}
      textTransform="capitalize"
      display={display}
    >
      {route === "/" ? <Text>My Dashboard</Text> : <Text>{pageTitle}</Text>}
    </Heading>
  );
};

PageTitle.propTypes = {
  display: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PageTitle.defaultProps = {
  display: "",
  pt: "",
};

export default PageTitle;
