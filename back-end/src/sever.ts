import express from 'express'
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()

app.use(express.json());

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`Cliente ID: ${socket.id} .`);

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
        
    })
});

server.listen(3333, () => {
    console.log("Sever is Running")
});
