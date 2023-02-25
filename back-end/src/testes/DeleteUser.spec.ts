import { DeleteUser } from "../users/services/DeleteUser";
import { IUsersRepository } from "../repositories/IUserRepository";
import { UsersRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory";
import { AppError } from "../errors/AppError";


describe("Delete User", () => {
    let userRepository: IUsersRepository
    let deleteUser: DeleteUser

    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        deleteUser = new DeleteUser(userRepository);

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


    it("Shouldn't be able to delete a user with a invalid CPF", async  () =>{

        await expect(deleteUser.execute({cpf:"123456789"})).rejects.toEqual(new AppError("CPF inválido."))
    })


    it("Shouldn't be able to delete with a not cadastred CPF", async  () =>{

        await expect(deleteUser.execute({cpf:"41530408865"})).rejects.toEqual(new AppError("CPF não encontrado."))
    })


    it("Should be able to dele a user", async () => {
        const resp = await deleteUser.execute({cpf:"39093407848"})

        expect(resp.sucess).toBe(true)  
    })
})