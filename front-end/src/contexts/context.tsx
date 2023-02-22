import { login } from '@/services/Auth';
import axios from 'axios';
import { kStringMaxLength } from 'buffer';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface Icontext {
    nome: string ;
    cpf: string;
    setCpf: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    cpfValid: boolean;
    serverMessage: string;
    chat: boolean;
    socket: Socket;
    room: string;
    messageList: IMessage[];
    getCliente: () => Promise<void>;
    joinRoom: () => void;
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
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setName] = useState('');
    const [chat, setChat] = useState(false);
    const [cpfValid, setCpfValid] = useState(true);
    const [serverMessage, setServerMessage] = useState('');
    const [messageList, setMessageList] = useState<IMessage[]>([]);

    const socket = io("http://localhost:3333");
    const room = "123"

    socket.on("reSendMessage", (reSendMessage) => {

      setMessageList((list) => [...list, reSendMessage]);
    })
    

    const getCliente = async () =>{
      event?.preventDefault();

      const user = await axios({
        url: "http://localhost:3333/auth",
        method: "post",
        data:{cpf:cpf, password: password}
      })

      if(user.data.sucess){
        setName(user.data.user.nome);
        login(user.data.token)
        joinRoom();
      }
  
      setCpfValid(user.data.sucess);
      setServerMessage(user.data.mensagem);  
    }

    const joinRoom = () => {
      if (cpf !== '') {
        socket.emit('joinRoom', { room: room});
        setChat(true);
      }
    }


  return (
    <ChatContext.Provider value={{
        nome, 
        socket, 
        room,
        cpf,
        setCpf,
        setPassword, 
        chat, 
        cpfValid, 
        serverMessage,
        messageList,
        getCliente,
        joinRoom
    }}>

      {children}

    </ChatContext.Provider>
     
  );
}

