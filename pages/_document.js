import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  componentWillMount = () => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
 }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name='keywords' content='spider8019 aman pratap singh meta ikshvaku ayodhya ram talent bhajans' />
          {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
          <script dangerouslySetInnerHTML={{
            __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-5871634443514718",
                enable_page_level_ads: true
                });
                `,
            }} /> */}

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
