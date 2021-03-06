import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* esri styles */}
          <link rel="stylesheet" href="https://js.arcgis.com/4.23/esri/themes/light/main.css"/>

          <meta name='keywords' content='spider8019 aman pratap singh meta ikshvaku ayodhya ram talent bhajans' />
          {/* google adsense */}
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
          <script dangerouslySetInnerHTML={{
              __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "pub-5871634443514718",
                  enable_page_level_ads: true
                  });
                  `,
                  }} />
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
