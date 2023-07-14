import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Reserva } from 'src/app/models/reserva/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuario!: any;
  reservas!: Array<Reserva>
  reservaEliminar: any;
  constructor(private router: Router, private servicioR: ReservaService) {
    this.reservas = new Array<Reserva>();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    };
    this.obtenerReservas();
    this.usuario = sessionStorage.getItem("user");
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public nuevaReserva() {
    this.router.navigate(["reserva-form", 0])
  }

  public modificarReserva(reserva: Reserva) {
    this.router.navigate(["reserva-form", reserva._id])
  }

  obtenerReservas() {
    this.servicioR.obtenerTodasLasReservas().subscribe(
      result => {
        this.dtTrigger.next(this.reservas);
        let unaR = new Reserva();
        result.forEach((element: any) => {
          Object.assign(unaR, element)
          this.reservas.push(unaR)
          unaR = new Reserva();
          this.ngOnDestroy()
        });
      },
      error => { }
    )
  }

  async eliminarReserva(reserva: Reserva) {
    try {
      this.servicioR.borrarReserva(reserva._id).subscribe(
        result => { }
      )
      location.reload();
    } catch (error) { }
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  abrirModalEliminar(reserva: any) {
    this.reservaEliminar = reserva;
  }
}

