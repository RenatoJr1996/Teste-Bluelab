import { ClienteRepository } from "../../../repositories/ClienteRepository";
import { CreateCliente } from "../CreateCliente";
import { DeleteCliente } from '../DeleteCliente';
import { ListByCpf } from '../ListByCpf';

let createCliente: CreateCliente;
let clienteRepository: ClienteRepository;
let deleteCliente: DeleteCliente;
let listByCpf: ListByCpf


describe("Delete Cliente", () => {

    beforeEach(() =>{

        clienteRepository = new ClienteRepository();
        createCliente = new CreateCliente(clienteRepository);
        deleteCliente = new DeleteCliente(clienteRepository);
        listByCpf = new ListByCpf(clienteRepository)
    });

    const cliente1 = {
        nome:"Gabriela",
        sobrenome: "Zani",
        telefone:"(14) 98122-5756",
        cpf:"39093407848"
    }
    const cliente2 = {
        nome:"Renato",
        sobrenome: "Junior",
        telefone:"(14) 98122-5756",
        cpf:"43640521838"
    }


    it("Should be able to delte a cliente", async  () =>{
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

        await deleteCliente.execute({cpf:cliente2.cpf});

        const teste1 = await listByCpf.execute({cpf: cliente1.cpf})
        const teste2 = await listByCpf.execute({cpf: cliente2.cpf})

    expect(teste1.sucess).toBe(true);
    expect(teste2.sucess).toBe(false);
    });

    it("Shouldn't be able to delete  cliente with the invalid CPF", async  () =>{
        await createCliente.execute({
            nome: cliente1.nome,
            sobrenome: cliente1.sobrenome,
            telefone: cliente1.telefone,
            cpf: cliente1.cpf
        }); 

        const teste1 = await deleteCliente.execute({cpf:"12345678912"})
        

    expect(teste1.sucess).toBe(false);

    });

    it("Shouldn't be able to create a cliente with with isn't cadastred CPF", async () =>{
        await createCliente.execute ({
            nome:cliente1.nome,
            sobrenome: cliente1.sobrenome,
            telefone: cliente1.telefone,
            cpf:cliente1.cpf
    }); 

    const teste1 = await deleteCliente.execute({cpf:cliente2.cpf})

    expect(teste1.sucess).toBe(false);
    });



})