import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteClienteController";
import { ListAllController } from "./controllers/ListAllController";
import { ListByCpfController } from "./controllers/ListByCpfController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { CreateCliente } from "./services/CreateUser";
import { DeleteUser } from "./services/DeleteUser";
import { ListAllUsers } from "./services/ListAllUsers";
import { ListUserBycpf } from "./services/ListUserBycpf";
import { UpadateUser } from "./services/UpdateUser";



const userRepository = new UsersRepository();

const createUser = new CreateCliente(userRepository);
export const createUserController = new CreateUserController(createUser);


const listByCpf = new ListUserBycpf(userRepository);
export const listByCpfController = new ListByCpfController(listByCpf);

const deleteUser = new DeleteUser(userRepository);
export const deleteUserController = new DeleteUserController(deleteUser);

const updateUser = new UpadateUser(userRepository);
export const updateUserController = new UpdateUserController(updateUser);

const listAll = new ListAllUsers(userRepository)
export const listAllController = new ListAllController(listAll);