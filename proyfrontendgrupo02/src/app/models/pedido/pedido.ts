import { Bebida } from "../bebida";
import { Promocion } from "../promocion/promocion";

export class Pedido {
    _id!:String;
    totalPedido !:  number
    fechaPedido!: string
    promociones!: Array<Promocion>
    bebidas!: Array<Bebida>

    constructor(){
        this.bebidas = new Array<Bebida>();
        this.promociones = new Array<Promocion>()
    }
}
