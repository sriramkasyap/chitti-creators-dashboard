import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";

import Layout from "../src/components/common/layout/Layout";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        {Component.name === "Login" || Component.name === "Signup" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
