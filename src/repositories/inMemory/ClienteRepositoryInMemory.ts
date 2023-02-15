import { Cliente } from "../../models/ClienteModel";
import { IClienteRepository, ICreateClienteDTO } from "../IClienteRepository";



export class ClienteRepositoryInMemory implements IClienteRepository {
    clientes: Cliente[] = [];

    async create({ nome, sobrenome, telefone, cpf }: ICreateClienteDTO): Promise<Cliente> {

        const cliente = new Cliente();
        Object.assign(cliente, {
            nome, 
            sobrenome, 
            telefone, 
            cpf,
            created_at: new Date()
        })

        this.clientes.push(cliente);
        return cliente;
    }


    async findByCpf(cpf: string): Promise<Cliente> {
        const cliente = this.clientes.find((cliente) => cliente.cpf === cpf );
        return cliente;
    }

    
    async list(): Promise<Cliente[]> {
        return this.clientes;
    }

}