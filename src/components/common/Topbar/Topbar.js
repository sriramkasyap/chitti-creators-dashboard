import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

import "@fontsource/quicksand/400.css";

import Button from "../Button/Button";
import SmallScreenSidebar from "./SideDrawer/SideDrawer";

const Topbar = () => {
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
    <>
      {/* Topbar for Widescreen Start */}
      <Flex
        display={["none", "none", "none", "none", "flex"]} // display according the breakpoints defined in theme.js
        flexDir="row"
        alignItems="center"
        justifyContent="flex-end"
        h="10vh"
        color="bright.fg"
        p={5}
      >
        <IconButton icon={<FaBell />} color="bright.fg" fontSize="3xl" />
        <Button
          rounded={"full"}
          variant="outline"
          text="Create New Newsletter"
          marginLeft="1.5rem"
          color="bright.fg"
          borderColor="bright.fg"
          fontWeight={400}
          _hover={{
            backgroundColor: "bright.fg",
            color: "bright.bg",
            borderColor: "bright.fg",
          }}
        />
      </Flex>
      {/* Topbar for Widescreen End */}

      {/* Topbar for Smallscreen Start */}
      <Flex
        display={["flex", "flex", "flex", "flex", "none"]}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        h="10vh"
        w="100vw"
        backgroundColor="bright.fg"
        color="bright.bg"
        p={5}
        position="fixed"
      >
        <SmallScreenSidebar />
        <Heading fontSize="5xl" alignSelf="center" letterSpacing="tight">
          Chitti.
        </Heading>
      </Flex>
      {/* Topbar for Widescreen End */}

      <Flex p={5} mt={[20, 24, 28, 36, 0]}>
        <Heading as="h2" size="2xl" textTransform="capitalize ">
          {route === "/" ? <Text>My Dashboard</Text> : <Text>{pageTitle}</Text>}
        </Heading>
      </Flex>
    </>
  );
};

export default Topbar;
