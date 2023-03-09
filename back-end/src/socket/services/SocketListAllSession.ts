import { SocketRepository } from "../../repositories/SocketRepository";




export class SocketListAllSession{
    constructor (private socketRepository: SocketRepository) {}

    async execute() {
         
    const sessions = await this.socketRepository.findAllSession()
    
    return sessions
    }
} 

