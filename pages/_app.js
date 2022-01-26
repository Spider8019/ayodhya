import '../styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Head>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
   )
}

export default MyApp
