import cpfValidator from 'node-cpf';
import { AppError } from '../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUserRepository';


interface IRequest {
    cpf?: string;
}

export class DeleteUser{
    constructor (private UserRepository: IUsersRepository) {}


    async execute({cpf}:IRequest) {
         
    if (!cpfValidator.validate(cpf)) {
        throw new AppError("CPF inválido.")
    }
    const CPF = cpfValidator.mask(cpf);

    const UserExist = await this.UserRepository.findByCpf(CPF);

    if (!UserExist) {
        throw new AppError("CPF não encontrado.")
    }     

    const Users = await this.UserRepository.delete(UserExist.id);

        return{sucess: true, mensagem: "Deletado com sucesso"}
    }
} 