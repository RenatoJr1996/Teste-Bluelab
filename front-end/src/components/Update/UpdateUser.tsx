import { Header } from "@/components/UseFul/Header";
import { Input } from "@/components/UseFul/Input";
import { api } from "@/services/Axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { ServerFailMessage } from "../Server Message/ServerFailMessage";
import { ServerSucessMessage } from "../Server Message/ServerSucessMessage";
import { Button } from "../UseFul/Button";
import { Form } from "../UseFul/Form";
import { FormBox } from "../UseFul/FormBox";

interface Props {
    userCPF: string | string[] | undefined
}


export default function UptdateAccount(userCPF:Props) {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpfValid, setCpfValid] = useState();
    const [serverMessage, setServerMessage] = useState('');

    const findUser = async () =>{
        const user = await api.put('/user', {
            data: { userCPF}
        });
        
        setCpf(user.data.user.cpf);
        setEmail(user.data.user.email);
        setName(user.data.user.name);
        setLastName(user.data.user.sobrenome);
        setPhone(user.data.user.telefone);
    }

    useEffect(() => {
        findUser();
        
    }, [])

    const UpdateUser = async () => {
        event?.preventDefault();
        
        const user = await api.patch("/user",{
                 data: {
                email:email, 
                password: "123456", 
                nome: name, 
                sobrenome: lastName, 
                telefone: phone, 
                cpf: cpf, 
                cpfAtual: userCPF 
            }
        });

       

    setCpfValid(user.data.sucess);
    setServerMessage(user.data.mensagem)
    }

    return (
        <FormBox>
           <Header span="Atualize os dados" title="Seja Bem-vindo ao Bluelab teste" />  

           { cpfValid ? <ServerSucessMessage message={serverMessage} /> :  <ServerFailMessage message={serverMessage} /> } 

           <Form>
                <Input title="Email" value={email} onChange={({ target }) => { setEmail(target.value) }} type="text"/>
                <Input title="Nome" value={name} onChange={({ target }) => { setName(target.value) }} type="text"/>
                <Input title="Sobrenome" value={lastName} onChange={({ target }) => { setLastName(target.value) }} type="text"/>
                <Input title="CPF" value={cpf} onChange={({ target }) => { setCpf(target.value) }} type="text"/>
                <Input title="Phone" value={phone} onChange={({ target }) => { setPhone(target.value) }} type="text"/>

                <Button onClick={UpdateUser} title="Atualizar" />
            </Form>
        </FormBox>
    )
}