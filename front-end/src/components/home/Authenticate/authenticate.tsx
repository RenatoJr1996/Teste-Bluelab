import { ChatContext, IMessage } from "@/contexts/context";
import { useContext, useState } from "react";
import { Header } from "../../UseFul/Header";
import { Input } from "../../UseFul/Input";
import { api } from "@/services/Axios";
import { login } from "@/services/Auth";
import { FormBox } from "@/components/UseFul/FormBox";
import { Form } from "@/components/UseFul/Form";
import { Alink } from "@/components/UseFul/Alink";
import { Button } from "@/components/UseFul/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from "axios";

const AuthenticateSchema = z.object({
  CPF: z.string()
    .min(11, {message: 'CPF inválido'})
    .max(14, {message: 'CPF inválido'})
    .regex(/^([0-9/.\\-]+)$/, {message: 'CPF deve conter apenas numeros, ., -'}) ,
  password: z.string()
    .min(6, {message:'A senha deve conter pelo menos 6 caracteres'} )
})

type AuthenticateData = z.infer<typeof AuthenticateSchema>

export function Authenticate() {
  const { setUserID, setName, setChat } = useContext(ChatContext);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthenticateData>({ resolver: zodResolver(AuthenticateSchema)})
 
  const getUser = async (data: AuthenticateData) => {
    try {

      const user = await api.post("/auth", {
          cpf: data.CPF,
          password: data.password
        });

        if (!user.data.sucess) {
          return alert(user.data.mensagem)
        }

          setName(user.data.user.nome);
          setUserID(user.data.user.id);

          login(user.data.token);

          setChat(true);



    } catch (error) {
      
        if(error instanceof AxiosError && error?.response?.data?.message){
            alert(error.response.data.message)
        }
    }

  }

  return (
    <div>
      <FormBox>
        <Header title='Seja Bem-vindo ao Bluelab teste' span='Entre para acessar o chat.' />

        <Form onSubmit={handleSubmit(getUser)} >
          <Input {...register("CPF")} title="CPF" type="text" errorMessage={errors.CPF?.message}/>
          <Input {...register("password")} type="password" title="Senha" errorMessage={errors.password?.message} />

          <Alink href="http://localhost:3000/CreateAccount" title="Criar Conta" />

          <Button disabled= {isSubmitting} title="Entrar" />
        </Form>
      </FormBox>
    </div>
  )
}