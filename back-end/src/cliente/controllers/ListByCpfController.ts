import { Request, Response } from "express";
import { ListByCpf } from "../services/ListByCpf";



export class ListByCpfController {

    constructor(private listByCpf: ListByCpf){}

    async handle( request:Request, response:Response){
        const  { cpf }  = request.body;
       
        const res = await this.listByCpf.execute({cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem, cliente: res.cliente});
    }
}