import { SocketRepository } from "../../repositories/SocketRepository";


interface ISession{
    userID: string;
    user: string;
}


export class SocketsaveSession{
    constructor (private socketRepository: SocketRepository) {}

    async execute({userID, user}:ISession)  {

        await this.socketRepository.saveSession({userID, user})
    }
}