// import { UsersRepository } from "../../../repositories/UsersRepository";
// import { CreateUser } from "../CreateUser";
// import { prismaMock } from "./singleton";
// import { Request } from "supertest";

// jest.mock("Request")


// describe("Create User", () => {

//     const userRepository = new UsersRepository();
//     const createUser = new CreateUser(userRepository);



//     it("Should be able to create a new user", async  () =>{
        

//         const user = {
//             id: "1",
//             admin: false,
//             created_at: new Date,
//             email:"renatto.cjunior@gmail.com",
//             password:"123",
//             nome:"Teste",
//             sobrenome: "Teste",
//             telefone:"(14) 98122-5756",
//             cpf:"43640521838"
//         }
            
//         prismaMock.users.create.mockResolvedValue(user)

//         await expect(createUser.execute(user)).resolves.toEqual({
//             id: "1",
//             admin: false,
//             created_at: new Date,
//             email:"renatto.cjunior@gmail.com",
//             password:"123",
//             nome:"Teste",
//             sobrenome: "Teste",
//             telefone:"(14) 98122-5756",
//             cpf:"43640521838"
//             })
//         })
            
//         });
     