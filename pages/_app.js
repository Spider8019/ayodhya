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

// MONGOOSE_MONGODB_URI=mongodb+srv://ikshvaku:bpE4EhY63d2UlyC7@cluster0.pjhsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// "mongodb://localhost:27017/ikshvakuDB"
const EmptyLayout = ({children}) => {return <>{children}</>}

export default MyApp
