// import { ClienteRepository } from "../../../repositories/ClienteRepository";
// import { CreateCliente } from "../CreateCliente";
// import { ListByCpf } from "../ListByCpf";

// let createCliente: CreateCliente;
// let clienteRepository: ClienteRepository;
// let listByCpf: ListByCpf


// describe("List By CPF", () => {

//     beforeEach(() =>{

//         clienteRepository = new ClienteRepository();
//         createCliente = new CreateCliente(clienteRepository);
//         listByCpf = new ListByCpf(clienteRepository)
//     });

//     const cliente = {
//         nome:"Renato",
//         sobrenome: "Junior",
//         telefone:"(14) 98122-5756",
//         cpf:"39093407848"
//     }

//     it("Should be able to list a cliente", async  () =>{
//         await createCliente.execute ({
//             nome:cliente.nome,
//             sobrenome: cliente.sobrenome,
//             telefone: cliente.telefone,
//             cpf:cliente.cpf
//     }); 

//         const teste1 = await listByCpf.execute({cpf:cliente.cpf});

//     expect(teste1).toHaveProperty("cliente")
//     });


//     it("Shouldn't be able to list a cliente with invalid CPF", async () =>{
//         await createCliente.execute ({
//             nome:cliente.nome,
//             sobrenome: cliente.sobrenome,
//             telefone: cliente.telefone,
//             cpf:cliente.cpf
//     }); 
//     const teste1 = await listByCpf.execute({cpf:'12345678912'});

//     expect(teste1).not.toHaveProperty("cliente")
//     });

//     it("Shouldn't be able to list a cliente with isn't cadastred CPF", async () =>{
//         await createCliente.execute ({
//             nome:cliente.nome,
//             sobrenome: cliente.sobrenome,
//             telefone: cliente.telefone,
//             cpf:cliente.cpf
//     }); 
 
//     const teste1 = await listByCpf.execute({cpf:'43640521838'});

//     expect(teste1).not.toHaveProperty("cliente")
//     });



// })