import { ChatContext } from "@/contexts/context";
import { useContext, useState } from "react";
import { Header } from "./Header";


export function Authenticate() {
 const { cpfValid, serverMessage, getCliente, setCpf } = useContext(ChatContext)



    return(
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">

        <Header title='Welcome to a BlueLab teste' span='Sign in to your chat.'/>

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
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">CPF</label>
                    <input  onChange={({ target }) => { setCpf(target.value) }} type="text" id="cpf" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                </div>
                <div className="flex justify-end">
                    <a href="http://localhost:3000/CreateAccount" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Create account</a>
                    <a href="http://localhost:3000/UpdateAccount" className="ml-3 text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Update account</a>
                </div>
                <button onClick={getCliente} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
        </section> 
      </main>
    )
}