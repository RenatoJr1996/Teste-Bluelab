import { Cliente } from "../models/ClienteModel";


export interface ICreateClienteDTO {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
}

export interface IClienteRepository {
    create({nome, sobrenome, telefone, cpf}:ICreateClienteDTO):Promise<Cliente>;
    findByCpf(cpf:string):Promise<Cliente>;
    list(): Promise<Cliente[]>;
    delete(id:string):Promise<Cliente[]>
}