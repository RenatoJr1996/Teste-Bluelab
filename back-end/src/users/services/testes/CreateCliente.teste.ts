import { app} from "../../../app";
import request from "supertest";


describe("Create Cliente", () => {



    const cliente = {
        nome:"Teste",
        sobrenome: "Teste",
        telefone:"(14) 98122-5756",
        cpf:"96484779651"
    }

    it("Should be able to create a new cliente", async  () =>{
        const response = await request.agent(app)
        .post('/cliente')
        .send({
            nome: cliente.nome,
            sobrenome: cliente.sobrenome,
            telefone: cliente.telefone,
            cpf: cliente.cpf
            }); 


        await request.agent(app)
        .delete('/cliente')
        .send({
            cpf:cliente.cpf
        })

            expect(response.body.sucess).toBe(true);
        });
     

        it("Shouldn't be able to create two cliente with the same CPF", async  () =>{
            const response1 = await request.agent(app)
            .post('/cliente')
            .send({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                telefone: cliente.telefone,
                cpf: cliente.cpf
                }); 
                console.log(response1.body.mensagem);
                

                const response2 = await request.agent(app)
                .post('/cliente')
                .send({
                    nome: cliente.nome,
                    sobrenome: cliente.sobrenome,
                    telefone: cliente.telefone,
                    cpf: cliente.cpf
                    }); 

    
    
            await request.agent(app)
            .delete('/cliente')
            .send({
                cpf:cliente.cpf
            })
    
                expect(response1.body.sucess).toBe(true);
                expect(response2.body.sucess).toBe(false);
            });

            
            it("Shouldn't be able to create a new cliente with invalid CPF ", async  () =>{
                const response = await request.agent(app)
                .post('/cliente')
                .send({
                    nome: cliente.nome,
                    sobrenome: cliente.sobrenome,
                    telefone: cliente.telefone,
                    cpf: "12345678978"
                    }); 
        
        
                await request.agent(app)
                .delete('/cliente')
                .send({
                    cpf:cliente.cpf
                })
        
                    expect(response.body.sucess).toBe(false);
                });


                it("Shouldn't be able to create a new cliente with invalid Phone number", async  () =>{
                    const response = await request.agent(app)
                    .post('/cliente')
                    .send({
                        nome: cliente.nome,
                        sobrenome: cliente.sobrenome,
                        telefone: "14981225756",
                        cpf: cliente.cpf
                        }); 
            
            
                    await request.agent(app)
                    .delete('/cliente')
                    .send({
                        cpf:cliente.cpf
                    })
            
                        expect(response.body.sucess).toBe(false);
                    });

})