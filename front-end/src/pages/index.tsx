import Head from 'next/head'
import { useContext, useEffect } from 'react';
import { Chat } from '@/components/home/chat/Chat';
import { Authenticate } from '@/components/home/Authenticate/authenticate';
import { ChatContext } from '@/contexts/context';
import { isAuthenticated } from '@/services/Auth';


  
export default function Home() {
const { chat, setChat } = useContext(ChatContext)

  useEffect(() => {
    if(isAuthenticated()){
      setChat(true)
    }
  }, [])
  

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      { chat ?  <Chat /> : <Authenticate /> }
    </>
  )
}