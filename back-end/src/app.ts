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
import { socketDeleteSessionController, socketFindSessionController, socketListAllSessionController, socketsaveSesionController } from './socket';
import { Session } from './models/SocketModel';


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

const sessions = [];

io.use(async (socket: ISocketIO, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  
  if (sessionID) {
    const session = sessions.find(session => session.sessionID === sessionID )
    
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.user = session.user
      return next();
    }
  }

  socket.sessionID = randomUUID();
  socket.user = socket.handshake.auth.nome;
  socket.userID = socket.handshake.auth.userID;
  next();
});



io.on("connection", async (socket: ISocketIO) => {
  console.log("Sessions data ",sessions);
  
  socket.user = socket.handshake.auth.nome;
  socket.userID = socket.handshake.auth.userID;
  if(!sessions.find(session => session.userID === socket.userID )){
      const session = new Session();

      Object.assign(session, {
          user: socket.user,
          sessionID: randomUUID(),
          userID: socket.userID
      })
      
      sessions.push(session)
  }

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);

  
  // socket.broadcast.emit("users",sessions);
  
  // socket.on("getUser", () => {
  //   socket.emit("userGet", sessions)
  // })

  socket.on("sendMessage", (data) => {
    console.log(data);
    
  })

  socket.on("disconnect", async () => {
    sessions.filter(sessions => sessions.userID != socket.userID)
    console.log(`User disconnected ${socket.user} session: ${socket.sessionID}`);
  })
});



