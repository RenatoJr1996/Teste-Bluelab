import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory"





export class SocketsaveSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute(sessionID, userID, user) {
         
    this.socketRepository.saveSession({sessionID, userID, user})

}
}