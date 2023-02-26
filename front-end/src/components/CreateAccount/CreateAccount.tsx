import { Header } from "@/components/UseFul/Header";
import { Input } from "@/components/UseFul/Input";
import { api } from "@/services/Axios";
import { useState } from "react";
import { z } from 'zod'
import { FormBox } from "../UseFul/FormBox";
import { Form } from "../UseFul/Form";
import { Alink } from "../UseFul/Alink";
import { Button } from "../UseFul/Button";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


const CreateAccountSchema = z.object({
    CPF: z.string()
        .min(11, {message: 'CPF inválido'})
        .max(14, {message: 'CPF inválido'})
        .regex(/^([0-9/.\\-]+)$/, {message: 'CPF deve conter apenas numeros, ., -'}) ,
    password: z.string()
        .min(6, {message:'A senha deve conter pelo menos 6 caracteres'}),
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
  
type CreateAccountData = z.infer<typeof CreateAccountSchema>


export default function CreateAccount() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting },  } = useForm<CreateAccountData>({ resolver: zodResolver(CreateAccountSchema)})



    const createUser = async (data:CreateAccountData) => {
        const user = await api.post("/user", { 
            nome: data.name, 
            sobrenome: data.lastName, 
            telefone: data.phone, 
            cpf: data.CPF, 
            email: data.email, 
            password: data.password 
        });

        if (!user.data.sucess) {
            return alert(user.data.mensagem);
          }

        alert(user.data.mensagem);
        router.push('/')
    }



    return (
        <FormBox>
            <Header span="Cria sua conta" title='Seja Bem-vindo ao Bluelab teste'/>
         
            <Form onSubmit={handleSubmit(createUser)} >
                <Input errorMessage={errors.email?.message} {...register('email')} title="Email" type="text"/> 
                <Input errorMessage={errors.name?.message} {...register('name')} title="Nome" type="text"/> 
                <Input errorMessage={errors.lastName?.message} {...register('lastName')} title="Sobrenome" type="text"/> 
                <Input errorMessage={errors.CPF?.message} {...register('CPF')} title="CPF" type="text"/> 
                <Input errorMessage={errors.phone?.message} {...register('phone')} title="Telefone" placeholder="(99) 99999-9999" type="text"/> 
                <Input errorMessage={errors.password?.message} {...register('password')} title="Senha" placeholder="*******" type="password"/> 
            
                <Alink  href="/" title="Login" />

                <Button disabled={isSubmitting} title="Criar" />
            </Form>

        </FormBox>
           
       
    )
}