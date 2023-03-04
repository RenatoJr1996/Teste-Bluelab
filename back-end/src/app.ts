import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import http from 'http'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import { AppError } from './errors/AppError';
import { randomUUID } from 'crypto';
import { SocketRepositoryInMemory } from './repositories/inMemory/SocketRepositoryInMemory'
import { socketListAllSessionController, socketsaveSesionController } from './socket';


interface ISocketIO extends Socket{
  user : string
  sessionID: string
  userID: string
}


export const app = express()

app.use(express.json());

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message,
            sucess: err.sucess
        })
    }
})

export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const sessionRepository = new SocketRepositoryInMemory();

io.use((socket: ISocketIO, next) => {
  const sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {

    const session = sessionRepository.findSession(sessionID);
    console.log(session);
    
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.user = session.user
      return next();
    }
  }

  socket.sessionID = randomUUID();
  socket.userID = randomUUID();
  socket.user = socket.handshake.auth.nome;
  socket.userID = socket.handshake.auth.userID;

  next();
});

const users = [];

io.on("connection", async (socket: ISocketIO) => {

  socketsaveSesionController.handle({sessionID: socket.sessionID, userID: socket.userID, user: socket.user})

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);
  
  (await socketListAllSessionController.handle()).map(session => {
    users.push({user: session.user, userID: session.userID})
  })

  socket.broadcast.emit("users", users);
  
  socket.on("getUser", () => {
    socket.emit("userGet", users)
  })
  

  socket.on("disconnect", () => {
    sessionRepository.deleteSession(socket.userID);
    socket.broadcast.emit("users", users);
    console.log(`User disconnected ${socket.id}`);
  })
});



