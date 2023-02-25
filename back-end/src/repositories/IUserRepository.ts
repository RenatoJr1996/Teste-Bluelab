import { Users } from "@prisma/client";
import { User } from "../models/UsersModel";
import { IResquestUpdate } from "../users/services/UpdateUser";


export interface ICreateUsersDTO {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
    cpfAtual?: string;
    email: string;
    password: string;
    admin?: boolean;
}

export interface IUsersRepository {
    create({nome, sobrenome, telefone, cpf, email, password }:ICreateUsersDTO):Promise<User>;
    findByCpf(cpf:string):Promise<User>;
    findByEmail(email:string):Promise<User>;
    findbyId(id:string):Promise<User>;
    list(): Promise<User[]>;
    delete(id:string):Promise<User[]>;
    update({id, nome, sobrenome, telefone, cpf, email}: IResquestUpdate):Promise<User>;
}

