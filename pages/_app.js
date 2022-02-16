import '../styles/globals.css'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import Router from "next/router"
import Head from 'next/head'
import NProgress from "nprogress"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const NestedLayout= Component.Layout || EmptyLayout

  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart',()=>{
      NProgress.start()
  })
  Router.events.on('routeChangeComplete',()=>{
    NProgress.done()
})

  return(
    <SessionProvider session={session} >
      <Layout>
        <NestedLayout>
          <Head>
               <link rel="stylesheet" 
                  href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" 
                  integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" 
                  crossOrigin="anonymous" 
                  referrerpolicy="no-referrer" />
          </Head>
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
