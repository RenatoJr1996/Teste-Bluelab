import { ChatContext } from "@/contexts/context";
import { useContext, useState } from "react";
import { Header } from "../../UseFul/Header";
import { Input } from "../../UseFul/Input";
import { api } from "@/services/Axios";
import { login } from "@/services/Auth";
import { ServerSucessMessage } from "../../Server Message/ServerSucessMessage";
import { ServerFailMessage } from "../../Server Message/ServerFailMessage";
import { FormBox } from "@/components/UseFul/FormBox";
import { Form } from "@/components/UseFul/Form";
import { Alink } from "@/components/UseFul/Alink";
import { Button } from "@/components/UseFul/Button";
import Image from 'next/image'



export function Authenticate() {
  const { socket, room, setName, setChat } = useContext(ChatContext);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [messageStatus, setMessageStatus] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const getUser = async () => {
    event?.preventDefault();

    const user = await api.post("/auth", {
      cpf: cpf,
      password: password
    });

    if (user.data.sucess) {
      setName(user.data.user.nome);
      login(user.data.token);
      joinRoom();
    }

    setMessageStatus(user.data.sucess);
    setServerMessage(user.data.mensagem);
  }

  const joinRoom = () => {
    if (cpf !== '') {
      socket.emit('joinRoom', { room: room });
      setChat(true);
    }
  }

  return (
    <div>
      <FormBox>
        <Header title='Seja Bem-vindo ao Bluelab teste' span='Entre para acessar o chat.' />

        {messageStatus ? <ServerSucessMessage message={serverMessage} /> : <ServerFailMessage message={serverMessage} />}

        <Form>
          <Input title="CPF" type="text" onChange={({ target }) => { setCpf(target.value) }} />
          <Input onChange={({ target }) => { setPassword(target.value) }} type="password" title="Senha" />

          <Alink href="http://localhost:3000/CreateAccount" title="Criar Conta" />

          <Button onClick={getUser} title="Entrar" />
        </Form>
      </FormBox>
    </div>
  )
}