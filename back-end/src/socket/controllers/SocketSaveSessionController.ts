import { SocketsaveSession } from "../services/SocketsaveSession";


interface ISession{
    sessionID: string;
    userID: string;
    user: string;
}



export class SocketsaveSessionController {
    constructor(private socketsaveSession: SocketsaveSession){}

    async handle({sessionID, userID, user}: ISession){
       
    this.socketsaveSession.execute({sessionID, userID, user});
    }
}
