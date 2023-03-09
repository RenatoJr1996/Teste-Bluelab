import { SocketRepository } from "../../repositories/SocketRepository";



export class SocketFindSession{
    constructor (private socketRepository: SocketRepository) {}

    async execute(userID: string) {
        
    const session = await this.socketRepository.findSession(userID);

    return session
    }
}