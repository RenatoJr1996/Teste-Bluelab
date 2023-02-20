import { Request, Response } from "express";
import { ListAllUsers } from "../services/ListAllUsers";




export class ListAllController {

    constructor(private listAll: ListAllUsers){}

    async handle( request:Request, response:Response){
       
        const res = await this.listAll.execute()

        return response.status(201).json({sucess: res.sucess, user: res.users});
    }
}