import { SocketRepositoryInMemory } from "../repositories/inMemory/SocketRepositoryInMemory";
import { SocketRepository } from "../repositories/SocketRepository";
import { SocketDeleteSessionController } from "./controllers/SocketDeleteSessionController";
import { SocketFindSessionController } from "./controllers/SocketFindSessionController";
import { SocketListAllSessionController } from "./controllers/SocketListAllSessionController";
import { SocketsaveSessionController } from "./controllers/SocketSaveSessionController";
import { SocketDeleteSession } from "./services/SocketDeleteSession";
import { SocketFindSession } from "./services/SocketFindSession";
import { SocketListAllSession } from "./services/SocketListAllSession";
import { SocketsaveSession } from "./services/SocketsaveSession";




const socketRepository = new SocketRepository();

const socketListAllSession = new SocketListAllSession(socketRepository);
export const socketListAllSessionController = new SocketListAllSessionController(socketListAllSession);

const socketsaveSession = new SocketsaveSession(socketRepository);
export const socketsaveSesionController = new SocketsaveSessionController(socketsaveSession);

const socketFindSession = new SocketFindSession(socketRepository);
export const socketFindSessionController = new SocketFindSessionController(socketFindSession);

const socketDeleteSession = new SocketDeleteSession(socketRepository);
export const socketDeleteSessionController = new SocketDeleteSessionController(socketDeleteSession);