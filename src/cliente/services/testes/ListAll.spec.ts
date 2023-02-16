import { ClienteRepository } from "../../../repositories/ClienteRepository";
import { CreateCliente } from "../CreateCliente";
import { ListAll } from "../ListAll";
import { ListByCpf } from "../ListByCpf";

let createCliente: CreateCliente;
let clienteRepository: ClienteRepository;
let listAll: ListAll;


describe("List All", () => {

    beforeEach(() =>{

        clienteRepository = new ClienteRepository();
        createCliente = new CreateCliente(clienteRepository);
        listAll = new ListAll(clienteRepository);

    });

    const cliente1 = {
        nome:"Gabriela",
        sobrenome: "JunZaniior",
        telefone:"(14) 98122-5756",
        cpf:"39093407848"
    }
    const cliente2 = {
        nome:"Renato",
        sobrenome: "Junior",
        telefone:"(14) 98122-5756",
        cpf:"43640521838"
    }

    it("Should be able to list a cliente", async  () =>{
        await createCliente.execute ({
            nome:cliente1.nome,
            sobrenome: cliente1.sobrenome,
            telefone: cliente1.telefone,
            cpf:cliente1.cpf
    }); 
        await createCliente.execute ({
            nome:cliente2.nome,
            sobrenome: cliente2.sobrenome,
            telefone: cliente2.telefone,
            cpf:cliente2.cpf
    }); 

        const teste1 = await listAll.execute();

    expect(teste1.cliente.length).toBeGreaterThan(1);
    });

})