import cpfValidator from 'node-cpf';
import { IUsersRepository } from '../../repositories/IUserRepository';


interface IRequest {
    cpf?: string;
}

export class DeleteUser{
    constructor (private UserRepository: IUsersRepository) {}


    async execute({cpf}:IRequest) {
         
    if (!cpfValidator.validate(cpf)) {
        return{sucess:false, mensagem: "CPF inválido."};
    }
    const CPF = cpfValidator.mask(cpf);

    const UserExist = await this.UserRepository.findByCpf(CPF);

    if (!UserExist) {
        return {sucess:false, mensagem: "CPF não encontrado."};
    }     

    const Users = await this.UserRepository.delete(UserExist.id);

        return{sucess: true, user:Users}
    }
} 