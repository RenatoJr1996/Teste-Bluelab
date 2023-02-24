import { Router } from 'express'
import { createUserController, deleteUserController, listByCpfController, listAllController, updateUserController, authenticateUserContoller, } from './users';
import { AuthenticateAdminMiddleware } from './middleware/AuthenticateAdminMiddleware';
export const routes = Router();


routes.post("/user", (request, response) => {
    return createUserController.handle(request, response);
});

routes.post('/auth',(request, response) => {
    return authenticateUserContoller.handle(request, response);
});

routes.delete("/user",AuthenticateAdminMiddleware ,(request, response) => {
    return deleteUserController.handle(request, response);
});

routes.patch("/user", (request, response) => {
    return updateUserController.handle(request, response);
});

routes.get("/all", AuthenticateAdminMiddleware, (request, response) => {
    return listAllController.handle(request, response);
});

routes.put("/user", (request, response) => {
    return listByCpfController.handle(request, response);
});


