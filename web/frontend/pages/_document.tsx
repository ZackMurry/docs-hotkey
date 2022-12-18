import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from 'lib/theme'

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang='en'>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.colors.lightBlue} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet' />
          <script defer src="https://app.tinyanalytics.io/pixel/CTYlZeLC19CwBr7v"></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
