import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { AuthenticateUserMiddleware } from './middleware/AuthenticateUsermiddleware';
import { AppError } from './errors/AppError';

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