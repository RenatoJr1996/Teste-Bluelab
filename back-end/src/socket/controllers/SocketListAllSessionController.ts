import { SocketListAllSession } from "../services/SocketListAllSession";




export class SocketListAllSessionController {
    constructor(private socketListAllSession: SocketListAllSession){}

    async handle(){
       
        const response = await this.socketListAllSession.execute();

        return response;
    }
}