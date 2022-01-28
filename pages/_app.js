import '../styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return(
    <SessionProvider session={session} >
      <Layout>
        <Head>
          <meta name="description" content="Login Page" />
          <link rel="icon" href="/static/withOutBgLogo.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
   )
}

export default MyApp
