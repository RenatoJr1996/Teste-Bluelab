import { Session } from "../../models/SocketModel";
import { ICreateSocketDTO, ISocketRepository } from "../ISocketRepository";




export class SocketRepositoryInMemory implements ISocketRepository {
    private sessions: Session[] = []

    async saveSession({user ,sessionID, userID}: ICreateSocketDTO): Promise<void> {
        const session = new Session();

        Object.assign(session, {
            user,
            sessionID,
            userID
        })
        
        this.sessions.push(session)
    }

    async findSession(UserID: string): Promise<Session> {
        return this.sessions.find(session => session.userID === UserID )
    }

    async findAllSession(): Promise<Session[]> {
        return this.sessions
    }

    async deleteSession(userID: string): Promise<void> {
        this.sessions.filter(sessions => sessions.userID != userID)
    }

}