import { AppError } from "../errors/AppError";
import { UsersRepositoryInMemory } from "../repositories/inMemory/UserRepositoryInMemory";
import { IUsersRepository } from "../repositories/IUserRepository";
import { CreateUser } from "../users/services/CreateUser";


describe("Create User", () => {
    let userRepository: IUsersRepository
    let createUser: CreateUser

    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        createUser = new CreateUser(userRepository);
    })


    it("Should be able to create a new user", async  () =>{
        const user = {
            email:"renatto.cjunior@gmail.com",
            password:"123",
            nome:"Gabriela",
            sobrenome: "Zani",
            telefone:"(14) 98122-5756",
            cpf:"39093407848"
        }
            
        const resp = await createUser.execute(user)

        expect(resp.sucess).toBe(true)
    })


    it("Shouldn't be able to create two users with the same cpf", async  () =>{
        const user = {
            email:"teste@teste",
            password:"123",
            nome:"Gabriela",
            sobrenome: "Zani",
            telefone:"(14) 98122-5756",
            cpf:"39093407848"
        }
        
       await expect(createUser.execute(user)).rejects.toEqual(new AppError('CPF já Cadastrado.'));
    })


    it("Shouldn't be able to create two users with the invalid cpf", async  () =>{
        const user = {
            email:"renato_correa13@hotmail.com",
            password:"123",
            nome:"Renato",
            sobrenome: "Junior",
            telefone:"(14) 98122-5756",
            cpf:"123456789"
        }

        await expect(createUser.execute(user)).rejects.toEqual(new AppError('CPF inválido.'));
    })


    it("Shouldn't be able to create two users with the invalid phone number", async  () =>{
        const user = {
            email:"renatocorrea13@hotmail.com",
            password:"123",
            nome:"Renato",
            sobrenome: "Junior",
            telefone:"123456789",
            cpf:"23841846360"
        }
            
        await expect(createUser.execute(user)).rejects.toEqual(new AppError('Telefone invalido'));
    })
    

    it("Shouldn't be able to create two users with the same email", async  () =>{
        const user = {
            email:"renatto.cjunior@gmail.com",
            password:"123",
            nome:"Gabriela",
            sobrenome: "Zani",
            telefone:"(14) 98122-5756",
            cpf:"11564136213"
        }
        
        await expect(createUser.execute(user)).rejects.toEqual(new AppError('Email já Cadastrado.'));
    })

    }
)       
            
        
     