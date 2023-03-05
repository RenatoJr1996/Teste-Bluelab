import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory"





export class SocketFindSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute(sessionID) {
        
         
    const session = this.socketRepository.findSession(sessionID);

    return session
    }
}