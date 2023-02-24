import { Request, Response } from "express";
import { CreateUser } from "../services/CreateUser";




export class CreateUserController {

    constructor(private createUser: CreateUser){}

    async handle( request:Request, response:Response){
     const { password, email, nome, sobrenome, telefone, cpf } = request.body
  
        const res = await this.createUser.execute({ password, email, nome, sobrenome, telefone, cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem});
    }
}