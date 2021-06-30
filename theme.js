import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import "@fontsource/quicksand/500.css";
import "@fontsource/josefin-sans/600.css";

const fonts = {
  body: "Quicksand",
  heading: "Josefin Sans",
};

const letterSpacings = {
  tight: "-4px",
};

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const theme = extendTheme({
  colors: {
    bright: {
      bg: "#ffffff",
      light: "#e1e1e1",
      gray: "#7e7e7e",
      fg: "#252525",
    },
    dark: {
      bg: "#252525",
      light: "#e1e1e1",
      gray: "#7e7e7e",
      fg: "#ffffff",
    },
  },
  components: {
    Drawer: {
      defaultProps: {
        colorScheme: "#252525",
      },
    },
  },
  letterSpacings,
  fonts,
  breakpoints,
});

export default theme;
