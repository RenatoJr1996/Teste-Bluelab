
import cpfValidator from 'node-cpf';
import { ClienteRepository } from '../../repositories/ClienteRepository';
import { ClienteRepositoryInMemory } from '../../repositories/inMemory/ClienteRepositoryInMemory';


interface IRequest {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
}

export class CreateCliente{
    constructor (private clienteRepository: ClienteRepository) {}

    async execute({nome, sobrenome, telefone, cpf}:IRequest) {
        
        if (!cpfValidator.validate(cpf)) {
            return {sucess:false, mensagem:'CPF inválido'}
        }

        if (await this.clienteRepository.findByCpf(cpf)) {
            return {sucess:false, mensagem:'CPF já Cadastrado'}
        }

        const CPF = cpfValidator.mask(cpf);

        await this.clienteRepository.create({ nome, sobrenome, telefone, cpf: CPF }); 

        return{sucess: true}
    }
} 