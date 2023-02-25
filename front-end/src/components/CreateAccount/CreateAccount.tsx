import { Header } from "@/components/UseFul/Header";
import { Input } from "@/components/UseFul/Input";
import { api } from "@/services/Axios";
import { useState } from "react";
import { ServerFailMessage } from "../Server Message/ServerFailMessage";
import { ServerSucessMessage } from "../Server Message/ServerSucessMessage";
import { z } from 'zod'
import { FormBox } from "../UseFul/FormBox";
import { Form } from "../UseFul/Form";
import { Alink } from "../UseFul/Alink";
import { Button } from "../UseFul/Button";



export default function CreateAccount() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpfValid, setCpfValid] = useState(false);
    const [serverMessage, setServerMessage] = useState('');



    const createUser = async () => {
        event?.preventDefault();

        const user = await api.post("/user", { 
            nome: name, 
            sobrenome: lastName, 
            telefone: phone, 
            cpf: cpf, 
            email: email, 
            password: password 
        });


    setCpfValid(user.data.sucess);
    setServerMessage(user.data.mensagem);
    }


    return (
        <FormBox>
            <Header span="Cria sua conta" title='Seja Bem-vindo ao Bluelab teste'/>
 
            { cpfValid ? <ServerSucessMessage message={serverMessage} /> :  <ServerFailMessage message={serverMessage} /> } 
         
            <Form>
                <Input title="Email" onChange={({ target }) => { setEmail(target.value) }} type="text"/> 
                <Input title="Nome" onChange={({ target }) => { setName(target.value) }} type="text"/> 
                <Input title="Sobrenome"  onChange={({ target }) => { setLastName(target.value) }} type="text"/> 
                <Input title="CPF" onChange={({ target }) => { setCpf(target.value) }}type="text"/> 
                <Input title="Telefone" placeholder="(00) 00000-0000" onChange={({ target }) => { setPhone(target.value) }}type="text"/> 
                <Input title="Senha" placeholder="*******" onChange={({ target }) => { setPassword(target.value) }} type="password"/> 
            
                <Alink  href="/" title="Login" />

                <Button onClick={createUser} title="Criar" />
            </Form>

        </FormBox>
           
       
    )
}