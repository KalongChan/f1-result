import Layout from "@/components/Layout/Layout";
import "@/styles/globals.scss";
import Head from "next/head";

export default function App({Component, pageProps}) {
  return (
    <Layout>
      <Head>
        <title>F1 Result App</title>
        <meta
          name="description"
          content="A web application for checking F1 results and standing"
        />
        <meta property="og:image" content="og.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
