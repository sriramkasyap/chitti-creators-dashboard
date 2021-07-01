import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../contexts/AuthContext";
import Layout from "../src/components/common/layout/Layout";
import theme from "../theme";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";

import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 800,
    showSpinner: false,
    parent: "body",
    minimum: 0.08,
  });

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        {pageProps.standardLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
