import { Request, Response } from "express";
import { ListById } from "../services/ListById";





export class ListByIdController {

    constructor(private listById: ListById){}

    async handle( request:Request, response:Response){

        const authHeader = request.headers.authorization;

        const res = await this.listById.execute(authHeader);

        return response.status(201).json({sucess: res.sucess, user: res.user});
    }
}