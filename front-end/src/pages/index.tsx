import Head from 'next/head'
import io, { Socket } from 'socket.io-client'
import { useContext, useState } from 'react';
import { Chat } from '@/components/Chat';
import axios from 'axios';

import { Authenticate } from '@/components/authenticate';
import { ChatContext } from '@/contexts/context';






export default function Home() {
const { chat } = useContext(ChatContext)

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