import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory";




export class SocketListAllSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute() {
         
    const sessions =  this.socketRepository.findAllSession()

    return sessions
    }
} 

