import { Session } from "../../models/SocketModel"

export interface ICreateSocketDTO {
    sessionID: string;
    userID: string;
    user: string
}

export interface ISocketRepository {
    findSession(sessionID: string): Session;
    saveSession({user,sessionID, userID}:ICreateSocketDTO): void;
    findAllSession(): Session[];
    deleteSession(userID: string): Session[];
}
