import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { api } from "@/services/axios";
import axios from "axios";
import { useState } from "react";




export default function CreateAccount() {

    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpfValid, setCpfValid] = useState(false);
    const [serverMessage, setServerMessage] = useState('');




    const createCliente = async () => {
        event?.preventDefault();
        const user = await api.post("/cliente", { 
            nome: name, 
            sobrenome: lastName, 
            telefone: phone, 
            cpf: cpf, 
            email: email, 
            password: password 
        });


    setCpfValid(user.data.sucess);
    setServerMessage(user.data.mensagem);
    setEmail('');
    
    }



    return (
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">

            <Header span="Cria sua conta" title="Welcome Bluelab teste"/>
 
            <section className="mt-10">

                {
                    cpfValid ?
                        <div className='text-center bg-green-400'>
                            <p className="text-white mb-2"> {serverMessage}</p>
                        </div>
                        :
                        <div className='text-center bg-red-400'>
                            <p className="text-white mb-2"> {serverMessage}</p>
                        </div>
                }

                <form className="flex flex-col" method="POST" action="#">

                <Input title="Email" onChange={({ target }) => { setEmail(target.value) }} type="text"/> 
                <Input title="Nome" onChange={({ target }) => { setName(target.value) }} type="text"/> 
                <Input title="Sobrenome"  onChange={({ target }) => { setLastName(target.value) }} type="text"/> 
                <Input title="CPF" onChange={({ target }) => { setCpf(target.value) }}type="text"/> 
                <Input title="Telefone" placeholder="(00) 00000-0000" onChange={({ target }) => { setPhone(target.value) }}type="text"/> 
                <Input title="Senha" placeholder="*******" onChange={({ target }) => { setPassword(target.value) }} type="password"/> 
                
                    <div className="flex justify-end">
                        <a href="/" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Login</a>
                    </div>
                    <button onClick={createCliente} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    )
}