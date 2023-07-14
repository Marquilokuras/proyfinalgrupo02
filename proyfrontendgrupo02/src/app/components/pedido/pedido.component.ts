import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns'
import { Bebida } from 'src/app/models/bebida';
import { Usuario } from 'src/app/models/usuario/usuario';
import { BebidaService } from 'src/app/service/bebida.service';
import { ConversorService } from 'src/app/service/conversor/conversor.service';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import { PromocionService } from 'src/app/service/promocion/promocion.service';
import { Promocion } from 'src/app/models/promocion/promocion';
import { log } from 'console';

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
  bebidaPedido = new Array();
  nombreBebidaPromo = new Array();
  arrayPromo = new Array();
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
  totalPrecioPromo: number = 0;
  fechaPedido !: Date;
  habilitacionPedido: boolean = false;
  cantidadBebidaPromo: number = 0;
  nombrePromo !: string;
  numeroPedido : number = 0;

  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute, public loginService: LoginService, public bebidaService: BebidaService, private conversorService: ConversorService, private toastrService: ToastrService, private promocionService: PromocionService, private router: Router) {
    this.fechaPedido = new Date();
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
    setTimeout(() => {
     
    }, 1000)
    this.obtenerMonedas();
    setTimeout(() => {

    }, 1000)
    this.obtenerPromociones();
    setTimeout(() => {

    }, 1000)
    this.obtenerPedidos();
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

  obtenerPedidos() {
    this.pedidoService.mostrarPedido().subscribe(
      result => {
        this.pedido = result;
        this.numeroPedido = this.pedido[this.pedido.length-1].numeroPedido+1;
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
    this.habilitacionPedido = true
    if(cantidad==0){
      cantidad++
    }
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
    if (this.habilitacionPedido === true ) {
     if(this.arrayPedido.length>0){
      this.emailUsuario = this.loginService.userLogged();
      let fechaActual = format(this.fechaPedido, 'dd/MM/yyyy HH:mm:ss')
      this.pedidoService.generarPedido(this.arrayPedido, this.emailUsuario, fechaActual,this.arrayPromo,this.total,this.numeroPedido).subscribe(
        result => {
          this.arrayPedido = [];
          this.arrayPromo = [];
          this.total=0;
          this.totalConversion = 0;
          this.conversionHabilitada = false;
          this.toastrService.success(`Revisa tu email para ver el total a pagar`, '¡Pedido realizado con exito!', {
            closeButton: true,
            timeOut: 4000,
            progressBar: true
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error => { }
      )
      }else{
        this.toastrService.warning(`El pedido no ha sido creado`, 'Debe agregar 1 bebida para poder acceder a una Promo', {
          closeButton: true,
          timeOut: 4000,
          progressBar: true
        });
      }
    } else {
      this.toastrService.warning(`El pedido no ha sido creado`, 'Debe agregar bebidas al pedido', {
        closeButton: true,
        timeOut: 4000,
        progressBar: true
      });
    }
  }

  cancelarPedido() {
    this.arrayPedido = [];
    this.total = 0;
    this.totalConversion = 0;
    this.conversionHabilitada = false;
    this.habilitacionPedido = false;
    if (this.cambios == "modificar") {
      this.router.navigate(["pedido-form"])
    }
  }

  modificarPedido() {
    this.pedidoService.modificarPedido(this.idPedido, this.arrayModificar).subscribe(
      result => {
        this.router.navigate(["pedido-form"])
       },
      error => { }
    )
  }

  obtenerPromociones() {
    this.promocionService.obtenerPromocionesDisponibles().subscribe(
      result => {
        let unaPromocion = new Promocion()
        result.forEach((element: any) => {
          Object.assign(unaPromocion, element)
          this.promocionBebida.push(unaPromocion)
          unaPromocion = new Promocion();
        });


      },
      error => { }
    )
  }

  public crearPedidoBebida(id: string, totalPromo: number, nombrePromo: string) {
    this.nombrePromo = nombrePromo;
    this.habilitacionPedido = true
    const promo = {
      idPromo: id,
      totalPromocion:totalPromo,
      nombrePromocion : nombrePromo
    };
    this.total = this.total + totalPromo
    this.arrayPromo.push(promo)
    this.pedidoSolicitado = true;  
  }

}
