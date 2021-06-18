import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import "@fontsource/quicksand/500.css";
import "@fontsource/josefin-sans/600.css";

const fonts = {
  body: "Quicksand",
  heading: "Josefin Sans",
};

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const theme = extendTheme(
  {
    colors: {
      bright: {
        white: "#e1e1e1",
        gray: "#7e7e7e",
        black: "#252525",
      },
      dark: {
        white: "#ffffff",
        light: "#e1e1e1",
        gray: "#7e7e7e",
      },
    },
    components: {
      Drawer: {
        defaultProps: {
          colorScheme: "#252525",
        },
      },
    },
    fonts,
    breakpoints,
  },
  withDefaultColorScheme({ colorScheme: "bright" })
);

export default theme;
