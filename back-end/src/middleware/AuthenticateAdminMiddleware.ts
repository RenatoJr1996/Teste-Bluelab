import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { app } from "../app";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository";



 interface IPayload {
    sub: string
 }


export async function AuthenticateAdminMiddleware(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(' ');

    try {
       const { sub } =  verify(token, '8552f03cb1c70bdea20afdaba4f07cd3') as IPayload;
    
       const userRepository = new UsersRepository();

       const userExist = await userRepository.findbyId( sub )
        
       if(!userExist.admin){
        throw new AppError("User doesn't have permission!", 401);
        
       }
        
       next();
       
    } catch (error) {
        throw new AppError('Invalid Token', 401);
    }
}