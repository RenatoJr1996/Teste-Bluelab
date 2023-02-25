import { hash } from 'bcrypt';
import cpfValidator from 'node-cpf';
import { AppError } from '../../errors/AppError';
import { UsersRepository } from '../../repositories/UsersRepository';


export interface IResquestUpdate {
    id?: string;
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
    cpfAtual?: string
    email: string
}

export class UpadateUser {
    constructor (private userRepository: UsersRepository) {}

    async execute({cpfAtual, cpf, nome, telefone, sobrenome, email} :IResquestUpdate) {
        if (!cpfValidator.validate(cpf) && !cpfValidator.validate(cpfAtual)) {
            throw new AppError("CPF inválido")         
        }
        const CPF = cpfValidator.mask(cpf);
        const CPFATUAL = cpfValidator.mask(cpfAtual);
        
        const userExist = await this.userRepository.findByCpf(CPFATUAL);
    
        if (!userExist) {
            throw new AppError("CPF não encontrado")
        }     

       
        const user = await this.userRepository.update({
            id: userExist.id,
            nome,
            sobrenome,
            telefone,
            cpf: CPF,
            email,
        }
            );
    
            return{sucess: true, user:user}
        }
} 