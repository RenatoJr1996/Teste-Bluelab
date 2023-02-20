import { ChatContextProvider } from '@/contexts/context'
import type { AppProps } from 'next/app'

import '../styles/globals.css'



export default function App({ Component, pageProps }: AppProps) {
  return (

    <ChatContextProvider>
       <Component {...pageProps} />
    </ChatContextProvider>
  )
}
