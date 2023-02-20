import cpfValidator from 'node-cpf';
import { UsersRepository } from '../../repositories/UsersRepository';


export interface IResquestUpdate {
    id?: string;
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string;
    cpfAtual?: string
    email: string
    password: string
}

export class UpadateUser {
    constructor (private UserRepository: UsersRepository) {}

    async execute({cpfAtual, cpf, nome, telefone, sobrenome, email, password} :IResquestUpdate) {
         
        if (!cpfValidator.validate(cpf) && !cpfValidator.validate(cpfAtual)) {
            return{sucess:false, mensagem: "CPF inválido"};
        }
        const CPF = cpfValidator.mask(cpf);
        const CPFATUAL = cpfValidator.mask(cpfAtual);
        
        const userExist = await this.UserRepository.findByCpf(CPFATUAL);
    
        if (!userExist) {
            return {sucess:false, mensagem: "CPF não encontrado"};
        }     
    
        const user = await this.UserRepository.update({
            id: userExist.id,
            nome,
            sobrenome,
            telefone,
            cpf: CPF,
            email,
            password}
            );
    
            return{sucess: true, user:user}
        }
} 