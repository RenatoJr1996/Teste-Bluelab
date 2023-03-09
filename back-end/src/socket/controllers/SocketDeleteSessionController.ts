import { SocketDeleteSession } from "../services/SocketDeleteSession";





export class SocketDeleteSessionController{
    constructor(private socketDeleteSession: SocketDeleteSession) {}

    async handle(sessionID: string){

    await this.socketDeleteSession.execute(sessionID);
    }
}