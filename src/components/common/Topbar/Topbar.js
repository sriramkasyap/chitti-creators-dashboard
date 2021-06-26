import { useRouter } from "next/router";
import { Flex, Heading } from "@chakra-ui/react";
import "@fontsource/quicksand/400.css";

import Button from "../Button/Button";
import SmallScreenSidebar from "./SideDrawer/SideDrawer";
import PageTitle from "../PageTitle/PageTitle";

const Topbar = ({ isTopbarDisplay }) => {
  const router = useRouter();

  const createNewsletterHandler = () => {
    router.push("/newsletters/new");
  };
  return (
    <>
      {/* Topbar for Widescreen Start */}
      <Flex
        display={["none", "none", "none", "none", isTopbarDisplay]} // display according the breakpoints defined in theme.js
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        h="10vh"
        color="bright.fg"
        p={5}
      >
        <Flex>
          <PageTitle />
        </Flex>
        <Flex>
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
            onClick={createNewsletterHandler}
          />
        </Flex>
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
        zIndex={1}
      >
        <SmallScreenSidebar />
        <Heading fontSize="5xl" alignSelf="center" letterSpacing="tight">
          Chitti.
        </Heading>
      </Flex>

      <Flex pt={5} pl={5} mt={[20, 24, 28, 36, 0]}>
        <PageTitle
          display={[
            isTopbarDisplay,
            isTopbarDisplay,
            isTopbarDisplay,
            isTopbarDisplay,
            "none",
          ]}
        />
      </Flex>
      {/* Topbar for Widescreen End */}
    </>
  );
};

export default Topbar;
