import { Request, Response } from "express";
import { CreateCliente } from "../services/CreateCliente";




export class CreateClienteController {

    constructor(private createCliente: CreateCliente){}

    handle( request:Request, response:Response){
        const { nome, sobrenome, telefone, cpf } = request.body;

        const res = this.createCliente.execute({ nome, sobrenome, telefone, cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem});
    }
}