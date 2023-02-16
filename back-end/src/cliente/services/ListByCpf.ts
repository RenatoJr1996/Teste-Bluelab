import cpfValidator from 'node-cpf';
import { ClienteRepository } from '../../repositories/ClienteRepository';


interface IRequest {
    cpf: string;
}

export class ListByCpf{
    constructor (private clienteRepository: ClienteRepository) {}

    async execute({cpf}:IRequest) {
         
    if (!cpfValidator.validate(cpf)) {
        return{sucess:false, mensagem: "CPF inválido"};
    }
    const CPF = cpfValidator.mask(cpf);

    const clienteExist = await this.clienteRepository.findByCpf(CPF);

    if (!clienteExist) {
        return {sucess:false, mensagem: "CPF não encontrado"};
    }     

        return{sucess: true, cliente:clienteExist}
    }
} 