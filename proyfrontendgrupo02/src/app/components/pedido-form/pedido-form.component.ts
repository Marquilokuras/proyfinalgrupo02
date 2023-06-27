import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  pedidos = new Array();
  bebidaPedido = new Array()

  constructor(private pedidoService: PedidoService, public loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.mostrarPedidos();
  }

  public mostrarPedidos() {
    this.pedidoService.mostrarPedido().subscribe(
      result => {
        this.pedidos = result;
        this.bebidaPedido = result.bebidasPedido
      },
      error => {
      }
    )
  }

  public eliminarPedido(idPedido: string) {
    console.log(idPedido)
    this.pedidoService.eliminarPedido(idPedido).subscribe(
      result => {
        this.pedidos = result;
        this.bebidaPedido = result.bebidasPedido
      },
      error => {
      }
    )
  }

  agregarPedido() {
    this.router.navigate(["pedido", 0])
  }
}
