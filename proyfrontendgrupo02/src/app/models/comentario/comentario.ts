import { Usuario } from "../usuario/usuario";

export class Comentario {
  _id!:string;
  usuario!:any;
  descripcionComentario!: string;
  puntajeComentario! : number;
  fechaComentario !:  string;
}
