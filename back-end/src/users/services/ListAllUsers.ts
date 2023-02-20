import { UsersRepository } from '../../repositories/UsersRepository';




export class ListAllUsers{
    constructor (private UserRepository: UsersRepository) {}

    async execute() {
         
    const Users = await this.UserRepository.list();

    return{sucess: true, users:Users}
    }
} 