import { Router } from 'express'
import { createUserController, deleteUserController, listByCpfController, listAllController, updateUserController, } from './users';


export const routes = Router();


routes.post("/cliente", (request, response) => {
    return createUserController.handle(request, response);
});


routes.put("/cliente", (request, response) => {
    return listByCpfController.handle(request, response);
});

routes.delete("/cliente", (request, response) => {
    return deleteUserController.handle(request, response);
});

routes.patch("/cliente", (request, response) => {
    return updateUserController.handle(request, response);
});

routes.get("/all", (request, response) => {
    return listAllController.handle(request, response);
});

