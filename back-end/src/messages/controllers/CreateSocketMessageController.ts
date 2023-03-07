import { CreateSocketMessage } from "../services/CreateSocketMessage";




export class CreateSocketMessageController{
    constructor(private createSocketMessage: CreateSocketMessage){}

    async handle({message, nome, time, toUser, toUserID, userID}) {

        await this.createSocketMessage.execute({message, nome, time, toUser, toUserID, userID})
    }
}