import { SocketMessageRepository } from "../../repositories/SocketMessagesRepository";




export class ListSocketMessage{
    constructor(private socketMessageRepository: SocketMessageRepository) {}

    async execute(userID: string) {

        const messages = await this.socketMessageRepository.listMessage(userID);

        return messages
    }
}