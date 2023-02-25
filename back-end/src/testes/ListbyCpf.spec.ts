import { DeleteUser } from "../users/services/DeleteUser";
import { IUsersRepository } from "../repositories/IUserRepository";
import { UsersRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory";
import { AppError } from "../errors/AppError";
import { ListUserBycpf } from "../users/services/ListUserBycpf";


describe("Delete User", () => {
    let userRepository: IUsersRepository
    let listByCpf: ListUserBycpf

    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        listByCpf = new ListUserBycpf(userRepository);

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


    it("Shouldn't be able to list a user by a invalid CPF", async  () =>{

        await expect(listByCpf.execute({cpf:'123456789'})).rejects.toEqual(new AppError("CPF inválido."))
    })


    it("Shouldn't be able to list user by not cadastred CPF", async  () =>{

        await expect(listByCpf.execute({cpf:'49413157820'})).rejects.toEqual(new AppError("CPF não encontrado"))
    })
    

    it("Should be able to list a user", async () => {
        const resp = await listByCpf.execute({cpf:'390.934.078-48'})
        
        expect(resp.sucess).toBe(true)
    })
})