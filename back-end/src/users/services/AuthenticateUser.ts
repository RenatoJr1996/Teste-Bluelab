import cpfValidator from 'node-cpf';
import { UsersRepository } from '../../repositories/UsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';



interface IRequest {
    cpf: string;
    password: string;
}



export class AuthenticateUser {
    constructor (private userRepository: UsersRepository) {}

    
    async execute({cpf, password}: IRequest) {

        if (!cpfValidator.validate(cpf)) {
            return{sucess:false, mensagem: "CPF ou Senha Inválidos."};
        }

        const CPF = cpfValidator.mask(cpf);

        const userExist = await this.userRepository.findByCpf(CPF);
    
        if (!userExist) {
          throw new AppError("CPF ou Senha Inválidos.")
        }

        const passwordMatch = await compare(password, userExist.password);

        if(!passwordMatch) {
            throw new AppError("CPF ou Senha Inválidos.")
        }

        const token = sign({}, "8552f03cb1c70bdea20afdaba4f07cd3",{
            subject: userExist.id,
            expiresIn:'1d'
        });

        return {sucess:true, mensagem: "Usuario autenticado.", token: token, user: userExist};
    }


}