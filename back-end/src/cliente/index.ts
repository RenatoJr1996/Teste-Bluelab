import { ClienteRepository } from "../repositories/ClienteRepository";
import { CreateClienteController } from "./controllers/CreateClienteController";
import { DeleteClienteController } from "./controllers/DeleteClienteController";
import { ListAllController } from "./controllers/ListAllController";
import { ListByCpfController } from "./controllers/ListByCpfController";
import { UpdateClienteController } from "./controllers/UpdateClienteController";
import { CreateCliente } from "./services/CreateCliente";
import { DeleteCliente } from "./services/DeleteCliente";
import { ListAll } from "./services/ListAll";
import { ListByCpf } from "./services/ListByCpf";



const clienteRepository = new ClienteRepository();
const createCliente = new CreateCliente(clienteRepository);
export const createClienteController = new CreateClienteController(createCliente);


const listByCpf = new ListByCpf(clienteRepository);
export const listByCpfController = new ListByCpfController(listByCpf);

const deleteCliente = new DeleteCliente(clienteRepository);
export const deleteClienteController = new DeleteClienteController(deleteCliente);

export const updateClienteController = new UpdateClienteController(createCliente, deleteCliente )

const listAll = new ListAll(clienteRepository)
export const listAllController = new ListAllController(listAll);