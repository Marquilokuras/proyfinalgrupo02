import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa';
import { Reserva } from 'src/app/models/reserva/reserva';
import { MesaService } from 'src/app/service/mesa.service';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-mesa-cliente',
  templateUrl: './mesa-cliente.component.html',
  styleUrls: ['./mesa-cliente.component.css']
})

export class MesaClienteComponent implements OnInit {

  mesa!: Mesa;
  mesasDisponibles!: Array<Mesa>;
  cantidadPersonas!: number;
  usuario!: any;
  mesasUsuario!: Array<Mesa>;
  mesasReservadas!: Array<Reserva>;
  todasLasReservas!: Array<Reserva>;
  reservaEliminar: any;
  modalReserva: Mesa;
  reserva!: Reserva;
  cantidadMesasElegida!: number;
  cantidadSillasElegida!: number;
  porMesa!: Array<Reserva>;
  horariosDisponibles!: Array<string>;
  fechaDeHoy!: Date;

  constructor(private servicio: MesaService, private router: Router, private servicioReserva: ReservaService, private toastrService: ToastrService) {
    this.mesasDisponibles = new Array<Mesa>();
    this.mesasReservadas = new Array<Reserva>();
    this.mesasUsuario = new Array<Mesa>();
    this.todasLasReservas = new Array<Reserva>();
    this.porMesa = new Array<Reserva>();
    this.mesa = new Mesa();
    this.reservaEliminar = new Mesa();
    this.modalReserva = new Mesa();
    this.reserva = new Reserva();
    this.horariosDisponibles = new Array<string>();
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem("user");
    this.obtenerMesasDisp();
    this.obtenerMesasReservadas();
    this.fechaDeHoy = new Date();
  }

  obtenerMesasDisp() {
    this.servicio.obtenerMesasDisponibles().subscribe(
      result => {
        let unaMesa = new Mesa();
        result.forEach((element: any) => {
          Object.assign(unaMesa, element)
          this.mesasDisponibles.push(unaMesa)
          unaMesa = new Mesa();
        });
      },
      error => { }
    )
  }

  async eliminarReserva(reserva: Reserva) {
    try {
      this.servicioReserva.borrarReserva(reserva._id).subscribe(
        result => {
          this.toastrService.error("Eliminando...");
        }
      )
      setTimeout(() => {
        location.reload();
      }, 500);
    } catch (error) { }
  }

  async guardarReserva(res: Mesa) {
    this.reserva.numeroMesa = res.numeroMesa;
    this.reserva.usuario = this.usuario;
    this.reserva.cantidadMesa = this.cantidadMesasElegida
    this.reserva.cantidadSilla = this.cantidadSillasElegida
    this.reserva.fecha = new Date()
    this.servicioReserva.crearReserva(this.reserva).subscribe(
      result => {
        this.toastrService.success("Mesa Reservada");
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => { }
    )
  }

  obtenerMesasReservadas() {
    this.servicioReserva.obtenerReservas(this.usuario).subscribe(
      result => {
        let unaReserva = new Reserva();
        result.forEach((element: any) => {
          Object.assign(unaReserva, element)
          this.mesasReservadas.push(unaReserva)
          unaReserva = new Reserva();
        });
      },
      error => { }
    )
  }

  obtenerPorNumeroDeMesa(numero: number) {
    this.servicioReserva.obtenerPorNumeroDeMesa(numero).subscribe(
      result => {
        let unaReserva = new Reserva();
        result.forEach((element: any) => {
          Object.assign(unaReserva, element)
          this.porMesa.push(unaReserva)
          unaReserva = new Reserva();
        });
      },
      error => { }
    )
  }

  abrirModalEliminar(reserva: any) {
    this.reservaEliminar = reserva;
  }

  abrirModalReservar(reserva: any) {
    this.modalReserva = reserva;
    this.obtenerPorNumeroDeMesa(this.modalReserva.numeroMesa);
    this.cantidadSillasElegida = this.modalReserva.cantidadSilla;
    this.cantidadMesasElegida = this.modalReserva.cantidadMesa;
  }

  getNumerosHastaCantidadSillas(): number[] {
    let numeros: Array<number>;
    numeros = new Array<number>();
    for (let i = 1; i <= this.modalReserva.cantidadSilla; i++) {
      numeros.push(i);
    }
    return numeros;
  }

  getNumerosHastaCantidadMesas(): number[] {
    let numeros: Array<number>;
    numeros = new Array<number>();
    for (let i = 1; i <= this.modalReserva.cantidadMesa; i++) {
      numeros.push(i);
    }
    return numeros;
  }

  getHorariosDisponibles(mesa: Mesa): string[] {
    const horarios: string[] = [];
    let horaActual = new Date().getHours();
    const horaLimite = 25;
    if (horaActual >= 1 && horaActual <= 18) {
      horaActual = 17;
    }

    for (let i = horaActual + 1; i <= horaLimite; i++) {

      if (i === 24) {
        horarios.push("00:00 a 02:00");
      }
      if (i !== 25 && i !== 24) {
        let h = i;
        if (h +2 == 24){
          horarios.push(`${i}:00 a 00:00`);
        }else{
          horarios.push(`${i}:00 a ${i + 2}:00`);
        }
        
      }
      i++;
    }

    const horariosFiltrados = horarios.filter((horario) => {
      return !this.porMesa.some((reserva) => reserva.hora === horario);
    });
    return horariosFiltrados;
  }

}


