import { Mesa } from "../mesa"
import { Usuario } from "../usuario/usuario"

export class Reserva {
    _id!:string
    hora!: string
    fecha!: string
    mesa!: Mesa
    usuario!: string
}
