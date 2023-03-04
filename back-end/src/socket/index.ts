import { SocketRepositoryInMemory } from "../repositories/inMemory/SocketRepositoryInMemory";
import { SocketListAllSessionController } from "./controllers/SocketListAllSessionController";
import { SocketsaveSessionController } from "./controllers/SocketSaveSessionController";
import { SocketListAllSession } from "./services/SocketListAllSession";
import { SocketsaveSession } from "./services/SocketsaveSession";




const socketRepository = new SocketRepositoryInMemory();

const socketListAllSession = new SocketListAllSession(socketRepository);
export const socketListAllSessionController = new SocketListAllSessionController(socketListAllSession)

const socketsaveSession = new SocketsaveSession(socketRepository)
export const socketsaveSesionController = new SocketsaveSessionController(socketsaveSession)