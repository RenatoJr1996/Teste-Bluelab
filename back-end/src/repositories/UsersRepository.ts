import { Users } from "@prisma/client";
import { IUsersRepository, ICreateUsersDTO } from "./IUserRepository";
import { PrismaClient } from '@prisma/client'
import { IResquestUpdate } from "../users/services/UpdateUser";

export const prisma = new PrismaClient();

export class UsersRepository implements IUsersRepository{

    async create({ email, password, nome, sobrenome, telefone, cpf}: ICreateUsersDTO ):Promise<Users>{
        const user = await prisma.users.create({
            data :{
                password,
                email,
                nome,
                sobrenome,
                telefone,
                cpf,
                admin: false,
                created_at: new Date()
            }
        })
        
        return user;
    }

    

    async list(): Promise<Users[]> {
   const users = await prisma.users.findMany();

        return users;
    }

    async findByEmail(email: string):Promise<Users>{
        const user = await prisma.users.findFirst({
            where: { email }
        })
        
        return user;
    }

    async findByCpf(cpf:string):Promise<Users> {
        const user = await prisma.users.findFirst({
            where: { cpf }
        })

        return user;
    }
    
    async findbyId(id:string):Promise<Users> {
        const user = await prisma.users.findFirst({
            where: { id }
        })

        return user;
    }

    async delete(id:string): Promise<Users[]> {
        await prisma.users.delete({
            where: {id}
        })

       return
    }


    async update({  id, nome, sobrenome, telefone, cpf, email }: IResquestUpdate ): Promise<Users> {
        const updatedUser = await prisma.users.update({
            where: {
              id: id,
            },
            data: {
                id, nome, sobrenome, telefone, cpf, email
            },
          })

       return updatedUser;
    }

}