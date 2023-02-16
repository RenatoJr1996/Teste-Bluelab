import cpfValidator from 'node-cpf';
import { ClienteRepository } from "../../../repositories/ClienteRepository";
import { CreateCliente } from "../CreateCliente";

let createCliente: CreateCliente;
let clienteRepository: ClienteRepository;



describe("Create Cliente", () => {

    beforeEach(() =>{

        clienteRepository = new ClienteRepository();
        createCliente = new CreateCliente(clienteRepository);
    });

    const cliente = {
        nome:"Renato",
        sobrenome: "Junior",
        telefone:"(14) 98122-5756",
        cpf:"39093407848"
    }

    it("Should be able to create a new cliente", async  () =>{
        const teste1 = await createCliente.execute ({
            nome:cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf:cliente.cpf
    }); 

    expect(teste1.sucess).toBe(true)
    });

    it("Shouldn't be able to create a two cliente with the same CPF", async  () =>{
        const teste1 = await createCliente.execute({
            nome: cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf: cliente.cpf
        }); 
        const teste2 = await createCliente.execute ({
            nome:cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf:cliente.cpf
    }); 

    expect(teste1.sucess).toBe(true);
    expect(teste2.sucess).toBe(false);
    });

    it("Shouldn't be able to create a cliente with invalid CPF", async () =>{
        const teste1 = await createCliente.execute ({
            nome:cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf:"12345678912"
    }); 


    expect(teste1.sucess).toBe(false);
    });

    it("Should't be able to create with invalid Telefone", async  () =>{
        const teste1 = await createCliente.execute ({
            nome:cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: "14981225756",
            cpf:cliente.cpf
    }); 
          
    expect(teste1.sucess).toBe(false);         
    })


})