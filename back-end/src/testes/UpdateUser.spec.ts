import { IUsersRepository } from "../repositories/IUserRepository";
import { UsersRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory";
import { AppError } from "../errors/AppError";
import { UpadateUser } from "../users/services/UpdateUser";


describe("Delete User", () => {
    let userRepository: IUsersRepository
    let updateUser: UpadateUser

    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        updateUser = new UpadateUser(userRepository);

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



    it("Shouldn't be able to update a user with a invalid CPF", async  () =>{
        const upadatedUser = {
            email:"renatto.cjunior@gmail.com",
                password:"123",
                nome:"Renato",
                sobrenome: "Junior",
                telefone:"(14) 98122-5756",
                cpf:"123456789",
                cpfAtual:"123789"
        }
        await expect(updateUser.execute(upadatedUser)).rejects.toEqual(new AppError("CPF inválido"))
    })


    it("Shouldn't be able to update with a not cadastred CPF", async  () =>{
        const upadatedUser = {
            email:"renatto.cjunior@gmail.com",
                password:"123",
                nome:"Renato",
                sobrenome: "Junior",
                telefone:"(14) 98122-5756",
                cpf:"37763583517",
                cpfAtual:"26486650567"
        }
        await expect(updateUser.execute(upadatedUser)).rejects.toEqual(new AppError("CPF não encontrado"))
    })


    it("Should be able to update a user", async () => {
        const upadatedUser = {
            email:"renatto.cjunior@gmail.com",
                password:"123",
                nome:"Renato",
                sobrenome: "Junior",
                telefone:"(14) 98122-5756",
                cpf:"37763583517",
                cpfAtual:"390.934.078-48"
        }

        const resp = await updateUser.execute(upadatedUser)

        expect(resp.sucess).toBe(true)  
    })
})