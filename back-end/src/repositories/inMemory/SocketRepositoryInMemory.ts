import { Session } from "../../models/SocketModel";
import { ICreateSocketDTO, ISocketRepository } from "./ISocketRepository";




export class SocketRepositoryInMemory implements ISocketRepository {
    private sessions: Session[] = []

    saveSession({user ,sessionID, userID}: ICreateSocketDTO): void {
        const session = new Session();

        Object.assign(session, {
            user,
            sessionID,
            userID
        })
        
        this.sessions.push(session)
    }

    findSession(UserID: string): Session {
        return this.sessions.find(session => session.userID === UserID )
    }

    findAllSession(): Session[] {
        return this.sessions
    }

    deleteSession(userID: string): Session[] {
        return this.sessions.filter(sessions => sessions.userID != userID)
    }

}