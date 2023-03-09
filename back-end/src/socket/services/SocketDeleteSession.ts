import { SocketRepository } from "../../repositories/SocketRepository";




export class SocketDeleteSession{
    constructor(private socketRepository: SocketRepository) {}


    async execute(sessionID: string){
        
        await this.socketRepository.deleteSession(sessionID);

    } 
}