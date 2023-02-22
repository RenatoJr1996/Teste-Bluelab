import { app} from "../../../app";
import request from "supertest";


describe("Delete", () => {



    const cliente = {
        nome:"Teste",
        sobrenome: "Teste",
        telefone:"(14) 98122-5756",
        cpf:"48253121440"
    }

    it("Should be able to delete a cliente", async  () =>{
        await request.agent(app)
        .post('/cliente')
        .send({
            nome: cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf: cliente.cpf
            });
            

        

        const response = await request.agent(app)
        .delete('/cliente')
        .send({
            cpf:cliente.cpf
        })

            expect(response.body.sucess).toBe(true);
        });
     

        it("Shouldn't be able to delete a cliente with invalid CPF", async  () =>{
            await request.agent(app)
            .post('/cliente')
            .send({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                telefone: cliente.telefone,
                cpf: cliente.cpf
                }); 
    
    
            const response = await request.agent(app)
            .delete('/cliente')
            .send({
                cpf:"12345678978"
            })
    
                expect(response.body.sucess).toBe(false);
            });

            it("Shouldn't be able to delete a cliente with isn't registred CPF", async  () =>{
                await request.agent(app)
                .post('/cliente')
                .send({
                    nome: cliente.nome,
                    sobrenome: cliente.sobrenome,
                    telefone: cliente.telefone,
                    cpf: cliente.cpf
                    }); 
        
        
                const response = await request.agent(app)
                .delete('/cliente')
                .send({
                    cpf:"96484779651"
                })
        
                    expect(response.body.sucess).toBe(false);
                });
       
})