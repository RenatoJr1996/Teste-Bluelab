import { ChatContext } from "@/contexts/context";
import { api } from "@/services/axios";
import axios from "axios";
import { useContext, useEffect, useState } from "react";


interface IUsers {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    cpf: String;
    telefone: string;
}


export default function AdminPage() {
    const [UserToken, setUserToken] = useState('')
    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    


    const listall = async () => {
        const users = await api.get('/all')

        setListUsers(users.data.user);
    }

    const deleteUser = async (cpf:String) => {
        await axios ({
            url: 'http://localhost:3333/cliente',
            method:'delete',
            data: {
                cpf: cpf
            }
        })
        return alert('User deletado com successo')
    }

    useEffect(() => {
        listall();
    }, [])


    return (
        <section className="text-gray-600 body-font">
            <div className="px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl p-2 font-medium title-font text-white bg-purple-400">Painel de controle</h1>
                </div>
                <div className=" w-full mx-auto overflow-auto">
                    <table className="table-auto w-full whitespace-no-wrap">
                        <thead className="block md:table-header-group">
                            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nome</th>
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Sobrenome</th>
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">CPF</th>
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Telefone</th>
                                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {listUsers.map(user => {
                                return (
                                    <tr key={user.id} className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold"></span>{user.nome}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold"></span>{user.sobrenome}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold"></span>{user.email}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold"></span>{user.cpf}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold"></span>{user.telefone}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold"></span>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500  mr-4 rounded"><a href={`http://localhost:3000/UpdateAccount/${user.cpf}`}>Edit</a></button>
                                            <button onClick={() => deleteUser(user.cpf) } className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                </div>
            </div>
        </section>
    )
}

