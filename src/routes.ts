import { Router } from 'express'
import { createClienteController, listByCpfController } from './cliente';


export const routes = Router();


routes.post("/cliente", (request, response) => {
    return createClienteController.handle(request, response);
});



routes.get("/cliente", (request, response) => {
    return listByCpfController.handle(request, response);
});
