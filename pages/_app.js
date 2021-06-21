import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/common/layout/Layout";
import { signIn, useSession } from "next-auth/client";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useSession();

  if (!session) {
    return (
      <>
        {" "}
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
    // Login UI comes Here
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
