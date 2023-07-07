import { Bebida } from "../bebida";

export class Promocion {

    _id!:String;
    nombrePromocion!: string
    totalPrecioPromocion!:  number
    totalPrecioBebidasSinDescuento!: number
    descuento!: number
    disponibilidadPromocion!: boolean
    fechaPromocion!: Date
    bebidas!: Array<Bebida>

    constructor(){
        this.bebidas = new Array<Bebida>();
    }

    
}
