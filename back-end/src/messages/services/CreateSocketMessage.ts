import { SocketMessageRepository } from "../../repositories/SocketMessagesRepository";




export class CreateSocketMessage {
    constructor(private socketMessageRepository: SocketMessageRepository) {}

    async execute({message, nome, time, toUser, toUserID, userID}) {

        if(message !== ''){
            await this.socketMessageRepository.create({message, nome, time, toUser, toUserID, userID})
        }
    }
}