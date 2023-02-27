
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Input } from './Input';
import { Form } from './Form';
import { Button } from './Button';
import { api } from '@/services/Axios';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'


const UpdateAccountSchema = z.object({
  CPF: z.string()
      .min(11, {message: 'CPF inválido'})
      .max(14, {message: 'CPF inválido'})
      .regex(/^([0-9/.\\-]+)$/, {message: 'CPF deve conter apenas numeros, ., -'}) ,
  email: z.string()
      .email({message: 'Digite um email válido'}),
  name: z.string()
      .min(3, {message: 'Digite seu nome'})
      .regex( /^([a-z]+)$/i, {message: 'Nome deve conter apenas letras'}),
  lastName: z.string()
      .min(3, {message: 'Digite seu sobrenome'})
      .regex( /^([a-z]+)$/i, {message: 'Sobreome deve conter apenas letras'}),
  phone: z.string()
      .min(14, {message:'Utilize o formate: (99) 99999-9999'})
      .regex( /^\(\d{2}\) \d{4,5}-\d{4}$/gi, {message:'Utilize o formate: (99) 99999-9999'}),
})

type UpdateAccountData = z.infer<typeof UpdateAccountSchema>
interface Props{
    userCpf: string
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function Modal({open, setOpen, userCpf}: Props) {
  const router = useRouter();

  const cancelButtonRef = useRef(null)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }} = useForm<UpdateAccountData>({ resolver: zodResolver(UpdateAccountSchema)})


  const findUser = async () =>{
    try {
      const user = await api.put('/user', {cpf: userCpf});
      
      setValue('email', user.data.user.email);
      setValue('name', user.data.user.nome);
      setValue('lastName', user.data.user.sobrenome);
      setValue('CPF', user.data.user.cpf);
      setValue('phone', user.data.user.telefone);

    } catch (error) {

      if(error instanceof AxiosError && error?.response?.data?.message){
          alert(error.response.data.message)
      }
    }

}

useEffect(() => {
    if(open){
      findUser();
    }
    
}, [open])

  const UpdateUser = async (data : UpdateAccountData) => {
    try {
      const user = await api.patch("/user",{
      email: data.email, 
      nome: data.name, 
      sobrenome: data.lastName, 
      telefone: data.phone, 
      cpf: data.CPF, 
      cpfAtual: userCpf 
   
    });

    alert("Usuario atualizado com sucesso")
    return router.reload();

    } catch (error) {

      if(error instanceof AxiosError && error?.response?.data?.message){
         alert(error.response.data.message)
            }
          }
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
                      <Form onSubmit={handleSubmit(UpdateUser)}>
                          <Input errorMessage={errors.email?.message} {...register('email')} title="Email" type="text"/>
                          <Input errorMessage={errors.name?.message} {...register('name')} title="Nome" type="text"/>
                          <Input errorMessage={errors.lastName?.message} {...register('lastName')} title="Sobrenome" type="text"/>
                          <Input errorMessage={errors.CPF?.message} {...register('CPF')} title="CPF" type="text"/>
                          <Input errorMessage={errors.phone?.message} {...register('phone')} title="Phone" type="text"/>
                          
                          <Button title="Atualizar" />
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
