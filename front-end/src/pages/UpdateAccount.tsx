import axios from "axios";
import { useState } from "react";




export default function UptdateAccount() {

    const [cpf, setCpf] = useState('');
    const [cpfAtual, setCpfAtual] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpfValid, setCpfValid] = useState();
    const [serverMessage, setServerMessage] = useState('');




    const createCliente = async () => {
        event?.preventDefault();
        const cliente = await axios({
            url: "http://localhost:3333/cliente",
            method: "patch",
            data: { nome: name, sobrenome: lastName, telefone: phone, cpf: cpf, cpfAtual: cpfAtual }
        });


    setCpfValid(cliente.data.sucess);
    setServerMessage(cliente.data.mensagem)
    }

    return (
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <section>
                <h3 className="font-bold text-2xl">Welcome Bluelab teste</h3>
                <p className="text-gray-600 pt-2">Update your account.</p>
            </section>

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
                <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-1 ml-3" htmlFor="Name">CPF</label>
                        <input onChange={({ target }) => { setCpfAtual(target.value) }} type="text" id="cpfAtual" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                    </div>

                    <h2 className="mb-6" >Atualizar dados:</h2>

                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-1 ml-3" htmlFor="Name">Nome</label>
                        <input onChange={({ target }) => { setName(target.value) }} type="text" id="Name" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-1 ml-3" htmlFor="LastName">Sobrenome</label>
                        <input onChange={({ target }) => { setLastName(target.value) }} type="text" id="LastName" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-1 ml-3" htmlFor="email">CPF</label>
                        <input onChange={({ target }) => { setCpf(target.value) }} type="text" id="cpf" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-1 ml-3" htmlFor="Phone">Telefone</label>
                        <input onChange={({ target }) => { setPhone(target.value) }} type="text" id="Phone" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                    </div>
                    <div className="flex justify-end">
                        <a href="/" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Login</a>
                        <a href="/CreateAccount" className="ml-3 text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Create Account</a>
                    </div>
                    <button onClick={createCliente} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Update</button>
                </form>
            </section>
        </main>
    )
}