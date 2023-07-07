import { Mesa } from "../mesa"

export class Reserva {
    _id!:string
    hora!: string
    fecha!: Date
    cantidadMesa!: number
    cantidadSilla!: number
    numeroMesa!: number
    usuario!: string
}
