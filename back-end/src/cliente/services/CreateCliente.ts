
import cpfValidator from 'node-cpf';
import { IClienteRepository } from '../../repositories/IClienteRepository';



interface IRequest {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
}

export class CreateCliente{
    constructor (private clienteRepository: IClienteRepository) {}

    async execute({nome, sobrenome, telefone, cpf}:IRequest) {
        
        if (!cpfValidator.validate(cpf)) {
            return {sucess:false, mensagem:'CPF inválido'}
        }

        const CPF = cpfValidator.mask(cpf);

        if (await this.clienteRepository.findByCpf(CPF)) {
            return {sucess:false, mensagem:'CPF já Cadastrado'}
        }

        const isValidPhone = (phone) => {
            const brazilianPhoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
            return brazilianPhoneRegex.test(phone);
          };

          if(!isValidPhone(telefone)){
            return {sucess:false, mensagem:'Telefone invalido'}
          } 

         this.clienteRepository.create({ nome, sobrenome, telefone, cpf: CPF }); 

        return{sucess: true, mensagem: "Cliente cadastrado com sucesso"}
    }
} 