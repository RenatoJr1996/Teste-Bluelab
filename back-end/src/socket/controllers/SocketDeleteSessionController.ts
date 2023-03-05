import { SocketDeleteSession } from "../services/SocketDeleteSession";





export class SocketDeleteSessionController{
    constructor(private socketDeleteSession: SocketDeleteSession) {}

    async handle(sessionID){

    this.socketDeleteSession.execute(sessionID);
    }
}