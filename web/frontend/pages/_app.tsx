import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { NextPage } from 'next'
import theme from 'lib/theme'
import 'styles/globals.css'
import DocumentationPage from 'components/DocumentationPage'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Docs Hotkey</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta
          name='keywords'
          content='Hotkey,Google,Docs,Debate,Format,Zack,Murry,Chrome,Extension,Browser,Shortcut,Highlight'
        />
        <meta name='description' content='A Chrome extension for creating hotkeys in Google Docs' />
      </Head>
      <ChakraProvider theme={theme}>
        <DocumentationPage>
          <Component {...pageProps} />
        </DocumentationPage>
      </ChakraProvider>
    </>
  )
}
export default MyApp
