import { Request, Response } from "express";
import { ListByCpf } from "../services/ListByCpf";



export class ListByCpfController {

    constructor(private listByCpf: ListByCpf){}

    handle( request:Request, response:Response){
        const { cpf } = request.body;
       
        const res = this.listByCpf.execute({cpf})

        return response.status(201).json({sucess: res.sucess, mensagem: res.mensagem, cliente: res.cliente});
    }
}