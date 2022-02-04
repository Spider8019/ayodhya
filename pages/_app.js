import '../styles/globals.css'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const NestedLayout= Component.Layout || EmptyLayout
  return(
    <SessionProvider session={session} >
      <Layout>
        <NestedLayout>
          <Component {...pageProps} />
        </NestedLayout>
      </Layout>
    </SessionProvider>
   )
}

// "mongodb://localhost:27017/ikshvakuDB"
const EmptyLayout = ({children}) => {return <>{children}</>}

export default MyApp
