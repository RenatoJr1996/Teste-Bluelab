import { randomUUID } from "crypto";
import { Server, Socket } from "socket.io";
import { server } from "./app";
import { listSocketMessageController, createSocketMessageController } from "./messages";
import { Session } from "./models/SocketModel";
import { socketFindSessionController, socketsaveSesionController, socketListAllSessionController, socketDeleteSessionController } from "./socket";


export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


interface ISocketIO extends Socket{
    user : string
    sessionID: string
    userID: string
  }


io.use(async (socket: ISocketIO, next) => {
    const userID = socket.handshake.auth.userID;
    
    if (userID) {
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
      
        await socketsaveSesionController.handle({user: socket.user, userID: socket.userID})
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
      socket.emit("userGet", sessions)
    })
  
    socket.on("messagesGet", () => {
      socket.emit("getMessages", messages);
      
    })
  
    socket.on("sendMessage", (message) => {
      
      createSocketMessageController.handle({
        message: message.message, 
        nome: message.nome, 
        time: message.time, 
        toUser: message.toUser, 
        toUserID: message.toUserID, 
        userID: message.userID
      })
      socket.to(message.toUserID).emit("sendMessage",message);
      
    })
  
    socket.on("disconnect", async () => {
      console.log(`User disconnected ${socket.user} session: ${socket.sessionID}`);
    })
  });