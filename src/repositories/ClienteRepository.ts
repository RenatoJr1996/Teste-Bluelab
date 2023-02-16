import { Cliente } from "../models/ClienteModel";
import { IClienteRepository, ICreateClienteDTO } from "./IClienteRepository";



export class ClienteRepository implements IClienteRepository{

    private clientes: Cliente[];

     constructor() {
        this.clientes = []
    }



    async create({ nome, sobrenome, telefone, cpf}: ICreateClienteDTO ):Promise<Cliente>{
        const cliente = new Cliente();

        Object.assign(cliente, {
            nome, 
            sobrenome, 
            telefone, 
            cpf,
            created_at: new Date()
        })

        this.clientes.push(cliente);
        return;
    }


    async list(): Promise<Cliente[]> {
        return this.clientes;
    }


    async findByCpf(cpf:string):Promise<Cliente> {
        const cliente = this.clientes.find((cliente) => cliente.cpf === cpf );
        return cliente;
    }

    async delete(id:string): Promise<Cliente[]> {
       this.clientes = await this.clientes.filter((cliente) => cliente.id != id );
       return this.clientes;
    }



}