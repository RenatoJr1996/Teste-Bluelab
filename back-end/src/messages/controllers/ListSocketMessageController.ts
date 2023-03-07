import { ListSocketMessage } from "../services/ListSocketMessage";





export class ListSocketMessageController{
    constructor(private listSsocketMessage: ListSocketMessage) {}

    async handle(userID: string) {

        const messages = await this.listSsocketMessage.execute(userID);

        return messages
    }
}