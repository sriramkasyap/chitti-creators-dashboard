import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";

import AuthProvider from "../contexts/AuthContext";
import Layout from "../src/components/common/layout/Layout";

import theme from "../theme";
import "nprogress/nprogress.css";

import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  NProgress.configure({
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
    <>
      <Head>
        <title>Chitti</title>
      </Head>
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
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object),
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
