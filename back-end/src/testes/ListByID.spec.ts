import { DeleteUser } from "../users/services/DeleteUser";
import { IUsersRepository } from "../repositories/IUserRepository";
import { UsersRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory";
import { AppError } from "../errors/AppError";
import { ListUserBycpf } from "../users/services/ListUserBycpf";
import { ListById } from "../users/services/ListById";


describe("List By ID", () => {
    let userRepository: IUsersRepository
    let listById: ListById

    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        listById = new ListById(userRepository);

        const user = {
            email:"renatto.cjunior@gmail.com",
            password:"123",
            nome:"Gabriela",
            sobrenome: "Zani",
            telefone:"(14) 98122-5756",
            cpf:"390.934.078-48"
        }

        userRepository.create(user)
    })

})