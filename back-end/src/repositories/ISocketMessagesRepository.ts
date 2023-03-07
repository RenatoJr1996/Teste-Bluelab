import { Message } from "../models/SocketModel";






export interface ICreateMessageDTO {
	toUser: string;
    toUserID: string;
	userID: string;
    nome: string;
    message: string;
    time: string;
}

export interface ISocketMessageRepository {
    create({nome, message, time, toUser, toUserID, userID }:ICreateMessageDTO):Promise<void>;
    listMessage(userID: string): Promise<Message[]>
}