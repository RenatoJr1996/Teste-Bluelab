import { api } from "@/services/Axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "../UseFul/Modal";


interface IUsers {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    telefone: string;
    admin: boolean;
}


export function TableBody() {
    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    const [open, setOpen] = useState(false);
    const [userCpf, setUserCpf]  = useState('');
    const { reload } = useRouter();

    const listall = async () => {
        try {
            const users = await api.get('/all')
    
            setListUsers(users.data.user);
        } catch (error) {
            if(error instanceof AxiosError && error?.response?.data?.mensagem){
                alert(error.response.data.mensagem)
            }
        }
    }

    const deleteUser = async (cpf: string) => {

        try {
        await api.delete('/user', { data: { cpf } })

        alert('Usuario deletado com successo');
        reload();

        } catch (error) {
            if(error instanceof AxiosError && error?.response?.data?.mensagem){
                alert(error.response.data.mensagem)
            }
        }

    }

    const openModal = async (cpf: string) => {   

        setUserCpf(cpf)
        setOpen(true)
    }


    useEffect(() => {
        listall();   
    }, [])

    return (
        <>
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
                            <button onClick={() => openModal(user.cpf)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500  mr-4 rounded">Edit</button>
                            <button onClick={() => deleteUser(user.cpf)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                           {user.admin &&  <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-yellow-500 ml-3 inline-block w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                            </svg>}
                        </td>
                        
                    </tr>
                )})}

        </tbody>
        
        <Modal userCpf={userCpf} setOpen={setOpen} open={open} />
        </>
      
    )
}