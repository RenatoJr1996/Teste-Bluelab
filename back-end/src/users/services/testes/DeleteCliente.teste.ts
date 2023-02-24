import { app} from "../../../app";
import request from "supertest";


describe("Delete", () => {



    const user = {
        nome:"Teste",
        sobrenome: "Teste",
        telefone:"(14) 98122-5756",
        cpf:"48253121440"
    }

    it("Should be able to delete a user", async  () =>{
        await request.agent(app)
        .post('/user')
        .send({
            nome: user.nome,
            sobrenome: user.sobrenome,
            telefone: user.telefone,
            cpf: user.cpf
            });
            

        

        const response = await request.agent(app)
        .delete('/user')
        .send({
            cpf:user.cpf
        })

            expect(response.body.sucess).toBe(true);
        });
     

        it("Shouldn't be able to delete a user with invalid CPF", async  () =>{
            await request.agent(app)
            .post('/user')
            .send({
                nome: user.nome,
                sobrenome: user.sobrenome,
                telefone: user.telefone,
                cpf: user.cpf
                }); 
    
    
            const response = await request.agent(app)
            .delete('/user')
            .send({
                cpf:"12345678978"
            })
    
                expect(response.body.sucess).toBe(false);
            });

            it("Shouldn't be able to delete a user with isn't registred CPF", async  () =>{
                await request.agent(app)
                .post('/user')
                .send({
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    telefone: user.telefone,
                    cpf: user.cpf
                    }); 
        
        
                const response = await request.agent(app)
                .delete('/user')
                .send({
                    cpf:"96484779651"
                })
        
                    expect(response.body.sucess).toBe(false);
                });
       
})