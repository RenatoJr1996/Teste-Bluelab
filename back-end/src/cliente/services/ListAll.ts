import { ClienteRepository } from '../../repositories/ClienteRepository';




export class ListAll{
    constructor (private clienteRepository: ClienteRepository) {}

    async execute() {
         
    const clientes = await this.clienteRepository.list();

    return{sucess: true, cliente:clientes}
    }
} 