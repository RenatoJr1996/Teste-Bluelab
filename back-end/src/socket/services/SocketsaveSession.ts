import { SocketRepositoryInMemory } from "../../repositories/inMemory/SocketRepositoryInMemory"


interface ISession{
    sessionID: string;
    userID: string;
    user: string;
}


export class SocketsaveSession{
    constructor (private socketRepository: SocketRepositoryInMemory) {}

    async execute({sessionID, userID, user}:ISession)  {
         
    const session = this.socketRepository.findSession(userID)
        
    if(!session) {
        console.log(`session ${sessionID} created`);
        
        this.socketRepository.saveSession({sessionID, userID, user})
    }
    }
}