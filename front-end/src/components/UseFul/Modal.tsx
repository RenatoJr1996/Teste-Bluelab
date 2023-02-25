
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Input } from './Input';
import { Form } from './Form';
import { Button } from './Button';
import { ServerSucessMessage } from '../Server Message/ServerSucessMessage';
import { ServerFailMessage } from '../Server Message/ServerFailMessage';
import { api } from '@/services/Axios';
import { useRouter } from 'next/router';

interface Props{
    userCpf: string
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function Modal({open, setOpen, userCpf}: Props) {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfValid, setCpfValid] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const { reload } = useRouter();

  const cancelButtonRef = useRef(null)

  const findUser = async () =>{
    const user = await api.put('/user', {cpf: userCpf});
    
    setCpf(user.data.user.cpf);
    setEmail(user.data.user.email);
    setName(user.data.user.nome);
    setLastName(user.data.user.sobrenome);
    setPhone(user.data.user.telefone);
}

useEffect(() => {
    if(open){
      findUser();
    }
    
}, [open])

  const UpdateUser = async () => {
    event?.preventDefault();
    
    const user = await api.patch("/user",{
            email:email, 
            nome: name, 
            sobrenome: lastName, 
            telefone: phone, 
            cpf: cpf, 
            cpfAtual: userCpf     
    });

   

      setCpfValid(user.data.sucess);
      setServerMessage(user.data.mensagem)

    alert("Usuario atualizado com sucesso")
    reload();
      
}

  return (

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                <div className='p-5' >
                  { cpfValid ? <ServerSucessMessage message={serverMessage} /> :  <ServerFailMessage message={serverMessage} /> } 

                  <Form>
                      <Input title="Email" value={email} onChange={({ target }) => { setEmail(target.value) }} type="text"/>
                      <Input title="Nome" value={name} onChange={({ target }) => { setName(target.value) }} type="text"/>
                      <Input title="Sobrenome" value={lastName} onChange={({ target }) => { setLastName(target.value) }} type="text"/>
                      <Input title="CPF" value={cpf} onChange={({ target }) => { setCpf(target.value) }} type="text"/>
                      <Input title="Phone" value={phone} onChange={({ target }) => { setPhone(target.value) }} type="text"/>

                      <Button onClick={UpdateUser} title="Atualizar" />
                  </Form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    
  )
}