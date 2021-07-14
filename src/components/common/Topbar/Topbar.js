import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Flex, Heading } from "@chakra-ui/react";

import "@fontsource/quicksand/400.css";

import Button from "../Button/Button";
import SmallScreenSidebar from "./SideDrawer/SideDrawer";
import PageTitle from "../PageTitle/PageTitle";

const Topbar = ({ isTopbarDisplay }) => {
  const router = useRouter();

  const goToCreatePage = (e) => {
    e.preventDefault();
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
            onClick={(e) => goToCreatePage(e)}
            rounded="full"
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
            _active={{
              backgroundColor: "bright.fg",
              color: "bright.bg",
              borderColor: "bright.fg",
            }}
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

      <Flex
        display={[
          isTopbarDisplay,
          isTopbarDisplay,
          isTopbarDisplay,
          isTopbarDisplay,
          "none",
        ]}
        pl={5}
        pr={5}
        pt={5}
        mt="10vh"
        flexDir={["column", "row"]}
        justifyContent="space-between"
      >
        <Flex>
          <PageTitle
            pt={5}
            display={[
              isTopbarDisplay,
              isTopbarDisplay,
              isTopbarDisplay,
              isTopbarDisplay,
              "none",
            ]}
          />
        </Flex>
        <Flex mt={5}>
          <Button
            onClick={(e) => goToCreatePage(e)}
            rounded="full"
            variant="outline"
            text="Create New Newsletter"
            color="bright.fg"
            borderColor="bright.fg"
            fontWeight={400}
            fontSize={["lg", "lg", "xl", "2xl"]}
            size="lg"
            _hover={{
              backgroundColor: "bright.fg",
              color: "bright.bg",
              borderColor: "bright.fg",
            }}
          />
        </Flex>
      </Flex>
      {/* Topbar for Smallscreen End */}
    </>
  );
};

Topbar.propTypes = {
  isTopbarDisplay: PropTypes.oneOf(["none", "flex"]),
};

Topbar.defaultProps = {
  isTopbarDisplay: "flex",
};

export default Topbar;
