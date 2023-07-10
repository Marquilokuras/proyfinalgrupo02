import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bebida } from 'src/app/models/bebida';
import { Usuario } from 'src/app/models/usuario/usuario';
import { BebidaService } from 'src/app/service/bebida.service';
import { ConversorService } from 'src/app/service/conversor/conversor.service';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {

  carta = new Array();
  pedido = new Array();
  arrayPedido = new Array();
  arrayModificar = new Array();
  numeros: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  cantidadBebidas !: number;
  idBebida !: string;
  bebidas !: Bebida
  pedidoSolicitado: boolean = false
  total: number = 0;
  cambios: string = 'new';
  idPedido!: string;
  emailUsuario !: string | null;
  monedaOrigen: string = 'usd';
  monedaDestino: string = 'ars';
  monedaSeleccionada: string = '';
  tiposMonedas: any;

  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute, public loginService: LoginService, public bebidaService: BebidaService, private conversorService: ConversorService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'].trim() === ":id") {
        this.cambios = "new";
      } else {
        this.cambios = "modificar";
        this.idPedido = params['id'];
        this.obtenerPedido(this.idPedido);
      }
    });
    this.obtenerBebidas();
    this.conversorService.getAll().subscribe(
      result => {
        this.tiposMonedas = result;
      }
    )
  }

  seleccionarMoneda(moneda: string): void {
    this.monedaSeleccionada = moneda;
  }

  obtenerPedido(pedidoId: string) {
    this.pedidoSolicitado = true;
    this.pedidoService.mostrarPedido().subscribe(
      result => {
        this.pedido = result;
        this.pedido.some(id => id === pedidoId);
        this.arrayModificar = this.pedido.find(item => item._id === pedidoId);
        if (this.arrayModificar) {
          this.pedido = this.pedido.filter(item => item._id !== pedidoId);
        }
      },
      error => { }
    )
  }

  obtenerBebidas() {
    this.bebidaService.obtenerBebidas().subscribe(
      result => {
        console.log(result);
        this.carta = result.map((any: any) => ({
          ...any,
          cantidad: ""
        }));
      },
      error => { }
    );
  }

  public crearPedido(identificador: string, precioDetalle: number, cantidad: number, nombreBebida: string) {
    const bebidaPedido = {
      cantidadBebidas: cantidad,
      precioDetalle: precioDetalle,
      bebida: identificador,
      nombreBebida: nombreBebida,
    };
    this.total = this.total + cantidad * precioDetalle
    this.arrayPedido.push(bebidaPedido)
    this.pedidoSolicitado = true;
    this.conversorService.getCurrencyValue(this.monedaOrigen, this.monedaDestino).subscribe(
      result => { },
      error => { }
    )
  }

  public generarPedido() {
    this.total = 0;
    this.emailUsuario = this.loginService.userLogged();
    this.pedidoService.generarPedido(this.arrayPedido, this.emailUsuario).subscribe(
      result => {
        this.arrayPedido = []
      },
      error => { }
    )
  }

  cancelarPedido() {
    this.arrayPedido = [];
    this.total = 0;
  }

  modificarPedido() {
    this.pedidoService.modificarPedido(this.idPedido, this.arrayModificar).subscribe(
      result => { },
      error => { }
    )
  }

}
