import { UsersRepository } from "../repositories/UsersRepository";
import { AuthenticateUserContoller } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { ListAllController } from "./controllers/ListAllController";
import { ListByCpfController } from "./controllers/ListByCpfController";
import { ListByIdController } from "./controllers/ListByIdControllers";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { AuthenticateUser } from "./services/AuthenticateUser";
import { CreateUser } from "./services/CreateUser";
import { DeleteUser } from "./services/DeleteUser";
import { ListAllUsers } from "./services/ListAllUsers";
import { ListById } from "./services/ListById";
import { ListUserBycpf } from "./services/ListUserBycpf";
import { UpadateUser } from "./services/UpdateUser";



const userRepository = new UsersRepository();

const createUser = new CreateUser(userRepository);
export const createUserController = new CreateUserController(createUser);


const listByCpf = new ListUserBycpf(userRepository);
export const listByCpfController = new ListByCpfController(listByCpf);

const deleteUser = new DeleteUser(userRepository);
export const deleteUserController = new DeleteUserController(deleteUser);

const updateUser = new UpadateUser(userRepository);
export const updateUserController = new UpdateUserController(updateUser);

const listAll = new ListAllUsers(userRepository)
export const listAllController = new ListAllController(listAll);

const authenticateUser = new AuthenticateUser(userRepository);
export const authenticateUserContoller = new AuthenticateUserContoller(authenticateUser);

const listById = new ListById(userRepository);
export const listByIdController = new ListByIdController(listById)