import { Component, OnInit } from '@angular/core';
import { Bebida } from 'src/app/models/bebida';
import { PedidoService } from 'src/app/service/pedido/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  cantidadBebidas !: number;
  idBebida !: string;
  precioDetalle !: number;
  arrayPedido = new Array();
  bebidas !: Bebida

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
  }

  public crearPedido() {

    const bebidaPedido = {
      cantidadBebidas: this.cantidadBebidas,
    //  precioDetalle: this.precioDetalle,
      bebida: this.idBebida,
    };

    console.log(bebidaPedido)

    this.arrayPedido.push(bebidaPedido)
    
    for(let i = 0; i < this.arrayPedido.length;i++){
      console.log(this.arrayPedido[i].cantidadBebidas)
     // console.log(this.arrayPedido[i].precioDetalle)
      console.log(this.arrayPedido[i].bebida)
    }
  }

  public generarPedido(){
    this.pedidoService.generarPedido(this.arrayPedido).subscribe(
      result => {

      },

      error => {
        console.log(error)
      }
    )
  }
}
