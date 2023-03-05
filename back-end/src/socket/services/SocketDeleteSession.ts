import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory";




export class SocketDeleteSession{
    constructor(private socketRepository: SocketRepositoryInMemory) {}


    async execute(sessionID){
        

        this.socketRepository.deleteSession(sessionID);
    } 
}