import { Request, Response } from "express";
import { DeleteUser } from "../services/DeleteUser";




export class DeleteUserController {

    constructor(private deleteUSer: DeleteUser){}

    async handle( request:Request, response:Response){
        const { cpf } = request.body;

        const res = await this.deleteUSer.execute({cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem, });
    }
}