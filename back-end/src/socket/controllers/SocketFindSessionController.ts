import { SocketFindSession } from "../services/SocketFindSession";





export class SocketFindSessionController{
    constructor(private socketFindSession: SocketFindSession){}

    async handle(userID: string){
    
    const session = await this.socketFindSession.execute(userID);

    return session
    }
}