import type { AppProps } from 'next/app'
import io from 'socket.io-client'

const socket = io("http://localhost:3333");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
