import express from 'express'
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

export const app = express()

app.use(express.json());

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    
    
    socket.on("joinRoom", ({room}) => {
        console.log(socket.id);
        socket.join(room);
    })

    socket.on("sendMessage", async (message) => {
        socket.to(message.room).emit("reSendMessage",message)
    })

    socket.on("disconnect", () => {
        
    })
});