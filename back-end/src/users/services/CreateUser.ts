
import cpfValidator from 'node-cpf';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { hash } from 'bcrypt'



interface IRequest {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
    email: string;
    password: string;
}

export class CreateCliente{
    constructor (private userRepository: IUsersRepository) {}

    async execute({password, email, nome, sobrenome, telefone, cpf}:IRequest) {
        
        if (!cpfValidator.validate(cpf)) {
            return {sucess:false, mensagem:'CPF inválido.'}
        }

        const CPF = cpfValidator.mask(cpf);

        if (await this.userRepository.findByCpf(CPF)) {
            return {sucess:false, mensagem:'CPF já Cadastrado.'}
        }

        const isValidPhone = (phone) => {
            const brazilianPhoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
            return brazilianPhoneRegex.test(phone);
          };

          if(!isValidPhone(telefone)){
            return {sucess:false, mensagem:'Telefone invalido'}
          } 

          const hashpassword = await hash(password, 8)

         this.userRepository.create({ password: hashpassword, email, nome, sobrenome, telefone, cpf: CPF }); 

        return{sucess: true, mensagem: "Cliente cadastrado com sucesso."}
    }
} 