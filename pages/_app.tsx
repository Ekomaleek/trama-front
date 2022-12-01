import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Roboto_Slab, Fira_Sans } from '@next/font/google'

import type { AppProps } from 'next/app'

import Layout from 'components/Layout'

import theme from 'theme'

export const robotoSlab = Roboto_Slab({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})
export const firaSans = Fira_Sans({
  weight: ['300', '400', '700', '800', '900'],
  subsets: ['latin'],
})

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Layout className={`${firaSans.className} ${robotoSlab.className}`}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
