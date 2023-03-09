import { SocketsaveSession } from "../services/SocketsaveSession";


interface ISession{
    userID: string;
    user: string;
}



export class SocketsaveSessionController {
    constructor(private socketsaveSession: SocketsaveSession){}

    async handle({userID, user}: ISession){
        
        await this.socketsaveSession.execute({userID, user});
    }
}
