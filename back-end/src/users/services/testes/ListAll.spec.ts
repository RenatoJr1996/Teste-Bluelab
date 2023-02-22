import { app} from "../../../app";
import request from "supertest";



describe("List All", () => {

    const cliente1 = {
        nome:"Gabriela",
        sobrenome: "JunZaniior",
        telefone:"(14) 98122-5756",
        cpf:"31135623171"
    }
    const cliente2 = {
        nome:"Renato",
        sobrenome: "Junior",
        telefone:"(14) 98122-5756",
        cpf:"26372728567"
    }



    afterAll(async () => {
        await request.agent(app)
        .delete('/cliente')
        .send({
            cpf:cliente1.cpf
        })

        await request.agent(app)
        .delete('/cliente')
        .send({
            cpf:cliente2.cpf
        })

    })
    

    it("Should be able to list all the clientes", async  () =>{

        await request.agent(app)
        .post('/cliente')
        .send({
            nome: cliente1.nome,
            sobrenome: cliente1.sobrenome,
            telefone: cliente1.telefone,
            cpf: cliente1.cpf
            }); 

        await request.agent(app)
        .post('/cliente')
        .send({
            nome: cliente2.nome,
            sobrenome: cliente2.sobrenome,
            telefone: cliente2.telefone,
            cpf: cliente2.cpf
            });

        const response = await request.agent(app)
        .get('/all')
        
    expect(response.body.cliente).toBeGreaterThan(1);
    });

})