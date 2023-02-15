import express from 'express'
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);

app.listen(3000, () => console.log("Sever is Running"));
