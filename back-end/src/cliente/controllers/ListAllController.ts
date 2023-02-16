import { Request, Response } from "express";
import { ListAll } from "../services/ListAll";




export class ListAllController {

    constructor(private listAll: ListAll){}

    async handle( request:Request, response:Response){
       
        const res = await this.listAll.execute()

        return response.status(201).json({sucess: res.sucess, cliente: res.cliente});
    }
}