import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import http from 'http'
import cors from 'cors'
import { Server} from 'socket.io'
import { AppError } from './errors/AppError';



export const app = express();

export const server = http.createServer(app);

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










