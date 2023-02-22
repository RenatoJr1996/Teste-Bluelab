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
    findByCpf(cpf:string):Promise<Users>;
    findbyId(id:string):Promise<Users>;
    list(): Promise<Users[]>;
    delete(id:string):Promise<Users[]>;
    update({id, nome, sobrenome, telefone, cpf, email, password}: IResquestUpdate):Promise<Users>;
}

