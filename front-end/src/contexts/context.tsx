import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface Icontext {
    socket: Socket;
    nome: string;
    userID: string;
    chat: boolean;
    setName: Dispatch<SetStateAction<string>>;
    setUserID: Dispatch<SetStateAction<string>>;
    setChat:  Dispatch<SetStateAction<boolean>>;
    setMessageList: Dispatch<SetStateAction<IMessage[]>>
    messageList: IMessage[]
  }

export interface IMessage {
  toUserID: string | undefined
  toUser: string | undefined
  userID: string;
  nome: string;
  message: string
  time: String;
    }
interface IChatContextProvider {
  children: ReactNode;
}

const socket = io("http://localhost:3333", { autoConnect: false });

 export const ChatContext = createContext({} as Icontext );


export function ChatContextProvider({ children }: IChatContextProvider ) {
    const [nome, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [chat, setChat] = useState(false);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    

   



  return (
    <ChatContext.Provider value={{
        nome,
        userID,   
        chat,
        setUserID,
        setChat,
        setName,
        socket,
        messageList,
        setMessageList
    }}>

      {children}

    </ChatContext.Provider>
     
  );
}

