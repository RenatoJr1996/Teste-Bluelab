import { Request, Response } from "express";
import { UpadateUser } from "../services/UpdateUser";





export class UpdateUserController {

    constructor(
        private updateUser: UpadateUser
        ){}

    async handle( request:Request, response:Response){
        const {cpfAtual, cpf, nome, telefone, sobrenome, email} = request.body;

        const res = await this.updateUser.execute({cpfAtual, cpf, nome, telefone, sobrenome, email})


        return response.status(201).json({sucess: res.sucess});
    }
}