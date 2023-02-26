
import cpfValidator from 'node-cpf';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { hash } from 'bcrypt'
import { AppError } from '../../errors/AppError';



interface IRequest {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
    email: string;
    password: string;
}

export class CreateUser{
    constructor (private userRepository: IUsersRepository) {}

    async execute({password, email, nome, sobrenome, telefone, cpf}:IRequest) {
        
        if (!cpfValidator.validate(cpf)) {
            throw new AppError('CPF inválido.');
        }

        const CPF = cpfValidator.mask(cpf);

        if (await this.userRepository.findByCpf(CPF)) {
            throw new AppError('CPF já Cadastrado.');
        }

        if (await this.userRepository.findByEmail(email)) {
            throw new AppError('Email já Cadastrado.');
        }

        const isValidPhone = (phone) => {
            const brazilianPhoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
            return brazilianPhoneRegex.test(phone);
          };

          if(!isValidPhone(telefone)){
            throw new AppError('Telefone invalido');
          } 

          const hashpassword = await hash(password, 8)

         this.userRepository.create({ password: hashpassword, email, nome, sobrenome, telefone, cpf: CPF }); 

        return{sucess: true, mensagem: "Usuario cadastrado com sucesso."}
    }
} 