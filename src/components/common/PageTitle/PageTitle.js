import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Heading, Text } from "@chakra-ui/react";

const PageTitle = () => {
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
    <Heading as="h2" size="xl" textTransform="capitalize ">
      {route === "/" ? <Text>My Dashboard</Text> : <Text>{pageTitle}</Text>}
    </Heading>
  );
};

export default PageTitle;
