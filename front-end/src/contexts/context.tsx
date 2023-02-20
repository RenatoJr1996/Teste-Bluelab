import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface Icontext {
    nome: string 
    cpf: string
    setCpf: Dispatch<SetStateAction<string>>
    cpfValid: boolean
    serverMessage: string
    chat: boolean
    socket: Socket
    room: string
    messageList: IMessage[]
    getCliente: () => Promise<void>
    joinRoom: () => void
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
    const [nome, setName] = useState('');
    const [chat, setChat] = useState(false);
    const [cpfValid, setCpfValid] = useState(true);
    const [serverMessage, setServerMessage] = useState('');
    const [messageList, setMessageList] = useState<IMessage[]>([]);

    const socket = io("http://localhost:3333");
    const room = "123"

    socket.on("reSendMessage", (reSendMessage) => {
      console.log(reSendMessage);

      setMessageList((list) => [...list, reSendMessage]);

      
    })
    

    const getCliente = async () =>{
      event?.preventDefault();
      const cliente = await axios({
        url: "http://localhost:3333/cliente",
        method: "put",
        data:{cpf:cpf}
      });
      
      if(cliente.data.sucess){
        setName(cliente.data.cliente.nome);  
        joinRoom();
      }
  
      setCpfValid(cliente.data.sucess);
      setServerMessage(cliente.data.mensagem)
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

