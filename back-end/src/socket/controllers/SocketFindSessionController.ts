import { SocketFindSession } from "../services/SocketFindSession";





export class SocketFindSessionController{
    constructor(private socketFindSession: SocketFindSession){}

    async handle(sessionID){
    
    const session = await this.socketFindSession.execute(sessionID);

    return session
    }
}