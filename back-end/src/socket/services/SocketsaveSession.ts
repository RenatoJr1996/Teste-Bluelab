import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory"





export class SocketsaveSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute(sessionID, userID, user) {
         
    const session = this.socketRepository.findSession(sessionID)
        
    if(!session) {
        console.log(`session ${sessionID} created`);
        
        this.socketRepository.saveSession({sessionID, userID, user})
    }
    }
}