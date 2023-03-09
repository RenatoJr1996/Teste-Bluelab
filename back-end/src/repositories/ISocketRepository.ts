import { Session } from "../models/SocketModel"

export interface ICreateSocketDTO {
    sessionID?: string;
    userID: string;
    user: string
}

export interface ISocketRepository {
    findSession(sessionID: string): Promise<Session>;
    saveSession({user,sessionID, userID}:ICreateSocketDTO): Promise<void>;
    findAllSession(): Promise<Session[]>;
    deleteSession(userID: string): Promise<void>;
}
