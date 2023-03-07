import { Message, Session } from "../models/SocketModel";
import { ICreateMessageDTO, ISocketMessageRepository } from "./ISocketMessagesRepository";
import { prisma } from "./UsersRepository";




export class SocketMessageRepository implements ISocketMessageRepository {



    async create({ nome, message, time, toUser, toUserID, userID }: ICreateMessageDTO): Promise<void> {
        await prisma.messages.create({
            data: {
                message,
                nome,
                time,
                toUser,
                toUserID,
                userID
            }
        })
        
    }

    async listMessage(userID: string): Promise<Message[]> {
        const messages = await prisma.messages.findMany({
            where:{
               OR: [
                {userID: {contains: userID}},
                {toUserID: {contains: userID}}
               ]
            }
        })
        return messages
    }
    }

