import cpfValidator from 'node-cpf';
import { IClienteRepository } from '../../repositories/IClienteRepository';


interface IRequest {
    cpf?: string;
    cpfAtual?: string
}

export class DeleteCliente{
    constructor (private clienteRepository: IClienteRepository) {}


    async execute({cpf, cpfAtual }:IRequest) {

    if(cpfAtual) {
        cpf = cpfAtual;
    }   
         
    if (!cpfValidator.validate(cpf)) {
        return{sucess:false, mensagem: "CPF inválido"};
    }
    const CPF = cpfValidator.mask(cpf);

    const clienteExist = await this.clienteRepository.findByCpf(CPF);

    if (!clienteExist) {
        return {sucess:false, mensagem: "CPF não encontrado"};
    }     

    const clientes = await this.clienteRepository.delete(clienteExist.id);

        return{sucess: true, cliente:clientes}
    }
} 