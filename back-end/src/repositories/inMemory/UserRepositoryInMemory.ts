
import { Users } from '@prisma/client';
import { randomUUID } from 'crypto';

import { User } from '../../models/UsersModel'
import { IResquestUpdate } from '../../users/services/UpdateUser';
import { ICreateUsersDTO, IUsersRepository } from "../IUserRepository";



export class UsersRepositoryInMemory implements IUsersRepository{
    private users: User[] = []
   


    async create({ email, password, nome, sobrenome, telefone, cpf}: ICreateUsersDTO ):Promise<Users>{
        const user = new User();
        
        Object.assign(user, {
            id: randomUUID(),
            cpf, 
            email,
            password,
            nome,
            sobrenome,
            telefone,
            admin: false,
            created_at: new Date
        })
           
        this.users.push(user)

        return user;
    }

    async findByCpf(cpf:string):Promise<User> {
        return this.users.find((user) => user.cpf === cpf);
    }

    async findByEmail(email:string):Promise<User> {
        return this.users.find((user) => user.email === email);
    }
    
    async findbyId(id:string):Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async delete(id:string): Promise<User[]> {
      return this.users.filter(user => user.id != id)
    }

    async list(): Promise<User[]> {
        return this.users
    }
  

    async update({id, nome, sobrenome, telefone, cpf, email }: IResquestUpdate ): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        this.users.filter(user => user.id != id)

        user.id = id
        user.nome = nome
        user.cpf = cpf
        user.sobrenome = sobrenome
        user.telefone = telefone
        user.email = email

        this.users.push(user)

        return user;
    }
    

}