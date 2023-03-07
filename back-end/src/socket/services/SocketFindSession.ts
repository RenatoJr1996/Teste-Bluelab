import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory"





export class SocketFindSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute(userID: string) {
        
         
    const session = this.socketRepository.findSession(userID);

    return session
    }
}