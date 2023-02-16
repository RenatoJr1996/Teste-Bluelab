import { Request, Response } from "express";
import { DeleteCliente } from "../services/DeleteCliente";




export class DeleteClienteController {

    constructor(private deleteCliente: DeleteCliente){}

    async handle( request:Request, response:Response){
        const { cpf } = request.body;

        const res = await this.deleteCliente.execute({cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem});
    }
}