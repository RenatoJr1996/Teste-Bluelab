import { Request, Response } from "express";
import { CreateCliente } from "../services/CreateCliente";
import { DeleteCliente } from "../services/DeleteCliente";




export class UpdateClienteController {

    constructor(
        private createCliente: CreateCliente,    
        private deleteCliente: DeleteCliente
        ){}

    async handle( request:Request, response:Response){
        const { nome, sobrenome, telefone, cpf, cpfAtual } = request.body;

        await this.deleteCliente.execute({cpfAtual})

        const res = await this.createCliente.execute({ nome, sobrenome, telefone, cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem});
    }
}