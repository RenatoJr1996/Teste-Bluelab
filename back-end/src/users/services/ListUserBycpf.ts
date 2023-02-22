import cpfValidator from 'node-cpf';
import { AppError } from '../../errors/AppError';
import { UsersRepository } from '../../repositories/UsersRepository';


interface IRequest {
    cpf: string;
}

export class ListUserBycpf{
    constructor (private userRepository: UsersRepository) {}

    async execute({cpf}:IRequest) {
         
    if (!cpfValidator.validate(cpf)) {
        throw new AppError("CPF inválido.")
    }
    const CPF = cpfValidator.mask(cpf);

    const userExist = await this.userRepository.findByCpf(CPF);
    
    if (!userExist) {
      throw new AppError("CPF não encontrado");
    }     

        return{sucess: true, user:userExist}
    }
} 