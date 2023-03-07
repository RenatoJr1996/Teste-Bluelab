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
import { socketDeleteSessionController, socketFindSessionController, socketListAllSessionController, socketsaveSesionController } from './socket';
import { Session } from './models/SocketModel';import { SocketMessageRepository } from './repositories/SocketMessagesRepository';
import { createSocketMessageController, listSocketMessageController } from './messages';
;


interface ISocketIO extends Socket{
  user : string
  sessionID: string
  userID: string
}

const socketMessageRepository = new SocketMessageRepository();

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



io.use(async (socket: ISocketIO, next) => {
  const userID = socket.handshake.auth.userID;
  
  if (userID) {
    // const session = sessions.find(session => session.sessionID === sessionID )
    const session = await socketFindSessionController.handle(userID)
    
    if (session) {
      socket.sessionID = session.sessionID;
      socket.userID = userID;
      socket.user = session.user
      return next();
    }
  }

  socket.sessionID = randomUUID();
  socket.user = socket.handshake.auth.nome;
  socket.userID = userID;
  next();
});



io.on("connection", async (socket: ISocketIO) => {
  
  socket.user = socket.handshake.auth.nome;
  socket.userID = socket.handshake.auth.userID;

  if(!await socketFindSessionController.handle(socket.userID)){
      const session = new Session();

      Object.assign(session, {
          user: socket.user,
          sessionID: randomUUID(),
          userID: socket.userID
      })
      
      await socketsaveSesionController.handle(session)
  }

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);

  const sessions = await socketListAllSessionController.handle();
  const messages = await listSocketMessageController.handle(socket.userID)
  
  socket.broadcast.emit("users",sessions);
  
  socket.on("getUser", () => {
    socket.emit("getMessages", messages)
    socket.emit("userGet", sessions)
  })

  socket.on("sendMessage", (message) => {
    createSocketMessageController.handle({
      message: message.message, 
      nome: message.nome, 
      time: message.time, 
      toUser: message.to.user, 
      toUserID: message.to.userID, 
      userID: message.userID
    })
    socket.to(message.to.userID).emit("sendMessage",message);
    
  })

  socket.on("disconnect", async () => {
    socketDeleteSessionController.handle(socket.userID);
    console.log(`User disconnected ${socket.user} session: ${socket.sessionID}`);
  })
});



