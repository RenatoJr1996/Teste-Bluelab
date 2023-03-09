import { Session } from "../models/SocketModel";
import { ICreateSocketDTO, ISocketRepository } from "./ISocketRepository";
import { prisma } from "./UsersRepository";




export class SocketRepository implements ISocketRepository {


    async saveSession({user, userID}: ICreateSocketDTO): Promise<void> {
        await prisma.sessions.create({
            data: {
                user: user,
                userID: userID,
                created_at: new Date()
            }
        })
    }
    async findSession(userID: string): Promise<Session> {
        return await prisma.sessions.findFirst({
            where: {userID}
        })
    }

    async findAllSession(): Promise<Session[]> {
        return await prisma.sessions.findMany()
    }

    async deleteSession(sessionID: string): Promise<void> {
        await prisma.sessions.delete({
            where: {sessionID}
        })
    }

}