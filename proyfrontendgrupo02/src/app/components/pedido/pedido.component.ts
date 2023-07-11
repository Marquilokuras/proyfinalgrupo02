import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { Usuario } from 'src/app/models/usuario/usuario';
import { BebidaService } from 'src/app/service/bebida.service';
import { ConversorService } from 'src/app/service/conversor/conversor.service';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PromocionService } from 'src/app/service/promocion/promocion.service';

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
  promocion = new Array();
  promocionBebidas = new Array();
  promocionBebida = new Array();
  bebidaPromocion = new Array();
  imgBebida = new Array();
  nombreBebida = new Array()
  nombreBebidaPedido = new Array()
  bebidaPedido  = new Array();
  numeros: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  cantidadBebidas !: number;
  idBebida !: string;
  bebidas !: Bebida
  pedidoSolicitado: boolean = false
  total: number = 0;
  cambios: string = 'new';
  idPedido!: string;
  emailUsuario !: string | null;
  monedaSeleccionada: string = '';
  codigoMonedaOrigen: string = "ars";
  codigoMonedaDestino!: string;
  resultadoConversion!: string;
  totalConversion!: number;
  monedas: any;
  conversionHabilitada: boolean = false;
  promoCantidad: number = 0;
  totalPrecioPromo !: number

  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute, public loginService: LoginService, public bebidaService: BebidaService, private conversorService: ConversorService, private toastrService: ToastrService, private promocionService: PromocionService) {
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
    this.obtenerMonedas();
    this.obtenerPromociones();
  }

  habilitarConversion(): void {
    this.conversionHabilitada = true;
  }

  obtenerMonedas(): void {
    this.conversorService.getAll().subscribe(
      data => {
        this.monedas = Object.entries(data).map(([key, value]) => ({ key, value }));
      },
      error => { }
    );
  }

  // Método para manejar el evento de selección de moneda
  seleccionarMoneda(event: any, tipo: string): void {
    const codigoMoneda = event.target.value;

    if (tipo === 'origen') {
      this.codigoMonedaOrigen = codigoMoneda;
    } else if (tipo === 'destino') {
      this.codigoMonedaDestino = codigoMoneda;
    }
  }

  convertirMonedas() {
    this.conversorService.getCurrencyValue(this.codigoMonedaOrigen, this.codigoMonedaDestino).subscribe(
      result => {
        this.resultadoConversion = this.codigoMonedaDestino;
        const valorConversion = result[this.codigoMonedaDestino];
        this.totalConversion = valorConversion * this.total;
      }
    );
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
    this.bebidaService.obtenerBebidasDisponibles().subscribe(
      result => {
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
  }

  public generarPedido() {
    this.total = 0;
    this.emailUsuario = this.loginService.userLogged();
    this.pedidoService.generarPedido(this.arrayPedido, this.emailUsuario).subscribe(
      result => {
        this.arrayPedido = [];
        this.totalConversion = 0;
        this.conversionHabilitada = false;
        this.toastrService.success(`Revisa tu email para ver el total a pagar`, '¡Pedido realizado con exito!', {
          closeButton: true,
          timeOut: 4000,
          progressBar: true
        });
      },
      error => { }
    )
  }

  cancelarPedido() {
    this.arrayPedido = [];
    this.total = 0;
    this.totalConversion = 0;
    this.conversionHabilitada = false;
  }

  modificarPedido() {
    this.pedidoService.modificarPedido(this.idPedido, this.arrayModificar).subscribe(
      result => { },
      error => { }
    )
  }

  obtenerPromociones() {
    this.promocionService.obtenerPromocionesDisponibles().subscribe(
      result => {
        this.promocion = result
        this.promocionBebidas = result
        this.cantidadBebidas = this.promocionBebidas[0].bebidas.length
        this.bebidaPromocion = this.promocionBebidas[0].bebidas
        let idBebida = "";
        for (let i = 0; i < this.cantidadBebidas; i++) {
          idBebida = this.bebidaPromocion[i]
          const vari = this.bebidaService.obtenerBebida(idBebida).subscribe(
            result => {
              this.promocionBebida = result;
              this.imgBebida = result.imagenBebida;
              result.nombreBebida;
              this.nombreBebida.push(result.nombreBebida)
            }
          )
        }
      },
      error => { }
    )
  }

  public crearPedidoBebida() {
    this.totalPrecioPromo = this.promocionBebidas[0].totalPrecioPromocion;
    for (let i = 0; i < this.cantidadBebidas; i++) {
      let idBebida = "";
      idBebida = this.bebidaPromocion[i]
      this.bebidaService.obtenerBebida(idBebida).subscribe(
        result => {
          this.promocionBebidas = result;
          this.imgBebida = result.imagenBebida;
        }
      )
      let nombre = this.nombreBebidaPedido;
      let precioPorBebida = this.totalPrecioPromo/this.cantidadBebidas
      let bebidaPedido = {
        cantidadBebidas: 1,
        precioDetalle: precioPorBebida,
        bebida: idBebida,
        nombreBebida: this.nombreBebida[i],
      };

      this.total = this.totalPrecioPromo;
      this.arrayPedido.push(bebidaPedido)
      this.pedidoSolicitado = true;
    }

  }

}
