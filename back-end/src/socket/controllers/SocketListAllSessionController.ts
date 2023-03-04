import { SocketListAllSession } from "../services/SocketListAllSession";




export class SocketListAllSessionController {
    constructor(private socketListAllSession: SocketListAllSession){}

    async handle( ){
       
        const response = this.socketListAllSession.execute();

        return response;
    }
}