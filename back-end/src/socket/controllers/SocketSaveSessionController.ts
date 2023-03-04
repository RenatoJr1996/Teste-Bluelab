import { SocketsaveSession } from "../services/SocketsaveSession";





export class SocketsaveSessionController {
    constructor(private socketsaveSession: SocketsaveSession){}

    async handle({sessionID, userID, user}){
       
    this.socketsaveSession.execute(sessionID, userID, user);
    }
}