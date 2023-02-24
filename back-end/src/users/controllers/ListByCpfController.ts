import { Request, Response } from "express";
import { ListUserBycpf } from "../services/ListUserBycpf";



export class ListByCpfController {

    constructor(private listByCpf: ListUserBycpf){}

    async handle( request:Request, response:Response){
        const  { cpf }  = request.body;
        console.log(cpf);
        
       
        const res = await this.listByCpf.execute({cpf})

        return response.status(201).json({sucess: res.sucess, user: res.user});
    }
}