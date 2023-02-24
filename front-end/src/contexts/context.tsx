import { login } from '@/services/Auth';
import { api } from '@/services/Axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface Icontext {
    nome: string;
    chat: boolean;
    setName: Dispatch<SetStateAction<string>>;
    setChat:  Dispatch<SetStateAction<boolean>>;
    socket: Socket;
    room: string;
    messageList: IMessage[];
  }

  export interface IMessage {
    room: string,
    name: string,
    message: string,
    time: String
  }
  
interface IChatContextProvider {
  children: ReactNode;
}
 export const ChatContext = createContext({} as Icontext );


export function ChatContextProvider({ children }: IChatContextProvider ) {
    const [nome, setName] = useState('');
    const [chat, setChat] = useState(false);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    

    const socket = io("http://localhost:3333");
    const room = "123"

    socket.on("reSendMessage", (reSendMessage) => {

      setMessageList((list) => [...list, reSendMessage]);
    })
    
  return (
    <ChatContext.Provider value={{
        nome, 
        socket, 
        room, 
        chat,
        setChat,
        setName,
        messageList,

    }}>

      {children}

    </ChatContext.Provider>
     
  );
}

