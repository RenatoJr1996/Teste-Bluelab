import { Request, Response } from "express";
import { DeleteUser } from "../services/DeleteUser";




export class DeleteUserController {

    constructor(private userCliente: DeleteUser){}

    async handle( request:Request, response:Response){
        const { cpf } = request.body;

        const res = await this.userCliente.execute({cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem});
    }
}