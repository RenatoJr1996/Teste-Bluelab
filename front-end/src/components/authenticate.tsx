import { ChatContext } from "@/contexts/context";
import { useContext, useState } from "react";
import { Header } from "./Header";
import { Input } from "./Input";


export function Authenticate() {
 const { cpfValid, serverMessage, getCliente, setPassword, setCpf } = useContext(ChatContext)



    return(
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">

        <Header title='Welcome to a BlueLab teste' span='Entre para acessar o chat.'/>

        <section className="mt-10">
          {
          cpfValid ? 
          
          <div></div> 
          : 
          <div className='text-center bg-red-400'>
          <p className="text-white mb-2"> {serverMessage}</p>
          </div>
          } 

            <form className="flex flex-col" method="POST" action="#">
                <Input title="CPF" type="text" onChange={({ target }) => { setCpf(target.value) }} />
                <Input onChange={({ target }) => { setPassword(target.value) }} type="password" title="Senha" />
                
                <div className="flex justify-end">
                    <a href="http://localhost:3000/CreateAccount" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Criar Conta!</a>

                </div>
                <button onClick={getCliente} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
        </section> 
      </main>
    )
}