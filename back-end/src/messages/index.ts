import { SocketMessageRepository } from "../repositories/SocketMessagesRepository";
import { CreateSocketMessageController } from "./controllers/CreateSocketMessageController";
import { ListSocketMessageController } from "./controllers/ListSocketMessageController";
import { CreateSocketMessage } from "./services/CreateSocketMessage";
import { ListSocketMessage } from "./services/ListSocketMessage";





const socketMessageRepository = new SocketMessageRepository();

const createSocketMessage = new CreateSocketMessage(socketMessageRepository);
export const createSocketMessageController = new CreateSocketMessageController(createSocketMessage);

const listSocketMessage = new ListSocketMessage(socketMessageRepository);
export const listSocketMessageController = new ListSocketMessageController(listSocketMessage)