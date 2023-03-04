import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface Icontext {
    nome: string;
    userID: string;
    chat: boolean;
    setName: Dispatch<SetStateAction<string>>;
    setUserID: Dispatch<SetStateAction<string>>;
    setChat:  Dispatch<SetStateAction<boolean>>;
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
    const [userID, setUserID] = useState('');
    const [chat, setChat] = useState(false);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    

    // const socket = io("http://localhost:3333");
    const room = "123"


  return (
    <ChatContext.Provider value={{
        nome,
        userID,  
        room, 
        chat,
        setUserID,
        setChat,
        setName,
        messageList,
    }}>

      {children}

    </ChatContext.Provider>
     
  );
}

