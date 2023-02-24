
import { UsersRepository } from "../../../repositories/UsersRepository";
import { ListAllUsers } from "../ListAllUsers";



describe("List All", () => {

        const userRepository = new UsersRepository();
        const listAll = new ListAllUsers(userRepository)
 
 
    it("Should be able to list all the users", async  () =>{

        const users = await listAll.execute();
       
        expect(users.sucess).toBe(true);
    });

})