import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  reserva!:Reserva;
  accion: string = "";
  usuario!: any;

  constructor(private servicio:ReservaService, private activatedRoute: ActivatedRoute,private router: Router) { 
    this.reserva = new Reserva();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.cargarReserva(params['id'])
      }
    });
    // this.usuario = sessionStorage.getItem("user");
    // this.reserva.usuario = this.usuario;
  }

  cargarReserva(id: string) {
    this.servicio.obtenerReserva(id).subscribe(
      result => {
        Object.assign(this.reserva, result);
      },
      error => { }
    )
  }
  guardarReserva() {
   console.log(this.reserva)
    this.reserva.fecha = new Date()
    this.servicio.crearReserva(this.reserva).subscribe(
      (result: any) => {
        alert("se guardo")
        this.router.navigate(["reserva"])
      },
      error => { 
        alert("nada")
      }
    )
  }
  actualizarReserva() {
    this.servicio.editarReserva(this.reserva).subscribe(
      (result: any) => {

        this.router.navigate(["reserva"])
      },
      error => { }
    )
  }
}
