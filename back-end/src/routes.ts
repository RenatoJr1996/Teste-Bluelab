import { Router } from 'express'
import { createClienteController, deleteClienteController, listByCpfController, listAllController, updateClienteController} from './cliente';


export const routes = Router();


routes.post("/cliente", (request, response) => {
    return createClienteController.handle(request, response);
});


routes.put("/cliente", (request, response) => {
    return listByCpfController.handle(request, response);
});

routes.delete("/cliente", (request, response) => {
    return deleteClienteController.handle(request, response);
});

routes.patch("/cliente", (request, response) => {
    return updateClienteController.handle(request, response);
});

routes.get("/all", (request, response) => {
    return listAllController.handle(request, response);
});

