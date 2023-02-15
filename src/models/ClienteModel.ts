import { randomUUID } from "crypto";





export class Cliente {
  id?: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  cpf: string;
  created_at: Date;


  constructor() {
    if (!this.id) [
     this.id = randomUUID()
    ]
  }
}
