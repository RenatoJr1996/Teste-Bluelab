import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { UsersRepository } from "../../repositories/UsersRepository";


interface IPayload {
    sub: string
 }


export class ListById {
    constructor (private userRepository: UsersRepository) {}

    async execute(authHeader: string) {
        if(!authHeader) {
            throw new AppError("Token missing", 401);
        }

        const [, token] = authHeader.split(' ');

        try {
           const { sub } =  verify(token, '8552f03cb1c70bdea20afdaba4f07cd3') as IPayload;
        
    
           const userExist = await this.userRepository.findbyId( sub )
            
           if(!userExist){
            throw new AppError("User doesn't exist!", 401);
           }
            
           return{sucess: true, user:userExist}
           
        } catch (error) {
            throw new AppError('Invalid Token', 401);
        }
    }   
    }

