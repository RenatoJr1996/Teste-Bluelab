import cpfValidator from 'node-cpf';
import { UsersRepository } from '../../repositories/UsersRepository';


interface IRequest {
    cpf: string;
}

export class ListUserBycpf{
    constructor (private userRepository: UsersRepository) {}

    async execute({cpf}:IRequest) {
         
    if (!cpfValidator.validate(cpf)) {
        return{sucess:false, mensagem: "CPF inválido"};
    }
    const CPF = cpfValidator.mask(cpf);

    const userExist = await this.userRepository.findByCpf(CPF);
    
    if (!userExist) {
        return {sucess:false, mensagem: "CPF não encontrado"};
    }     

        return{sucess: true, user:userExist}
    }
} 