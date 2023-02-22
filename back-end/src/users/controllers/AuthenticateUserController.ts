import { Request, Response } from "express";
import { AuthenticateUser } from "../services/AuthenticateUser";





export class AuthenticateUserContoller {

    constructor(private authenticateUser: AuthenticateUser){}

    async handle( request:Request, response:Response){
     const { cpf, password } = request.body

        const res = await this.authenticateUser.execute({ cpf, password})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem, token: res.token, user: res.user});
    }
}