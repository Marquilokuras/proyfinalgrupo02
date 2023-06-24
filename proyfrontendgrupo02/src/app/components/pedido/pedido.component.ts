import { Component, OnInit } from '@angular/core';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  cantidadBebidas !: number;
  idBebida !: string;
  arrayPedido = new Array();
  bebidas !: Bebida
  pedidoSolicitado : boolean = false
  carta = new Array();

  constructor(private pedidoService: PedidoService,public loginService: LoginService, public bebidaService: BebidaService) {
    
  }

  ngOnInit(): void {
    this.obtenerBebidas();
  }

  obtenerBebidas() {
    this.bebidaService.obtenerBebidas().subscribe(
      result => {
        console.log(result)
        this.carta = result;
      },
      error => {
        console.log(error)
      }
    )
  }

  public crearPedido(identificador:string,precioDetalle:number) {

    const bebidaPedido = {
      cantidadBebidas: this.cantidadBebidas,
      precioDetalle: precioDetalle,
      bebida: identificador,
    };
 
    this.arrayPedido.push(bebidaPedido)
    this.pedidoSolicitado = true;

  }

  public generarPedido(){
    this.pedidoService.generarPedido(this.arrayPedido).subscribe(
      result => {
        this.arrayPedido = []
      },

      error => {
        console.log(error)
      }
    )
  }
}
