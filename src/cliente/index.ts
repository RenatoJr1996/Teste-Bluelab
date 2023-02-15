import { ClienteRepository } from "../repositories/ClienteRepository";
import { CreateClienteController } from "./controllers/CreateClienteController";
import { ListByCpfController } from "./controllers/ListByCpfController";
import { CreateCliente } from "./services/CreateCliente";
import { ListByCpf } from "./services/ListByCpf";



const clienteRepository = new ClienteRepository();
const createCliente = new CreateCliente(clienteRepository);
export const createClienteController = new CreateClienteController(createCliente);


const listByCpf = new ListByCpf(clienteRepository);
export const listByCpfController = new ListByCpfController(listByCpf);