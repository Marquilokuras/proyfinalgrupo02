import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  mesa!:Mesa;
  mesasDisponibles!:Array<Mesa>;
  cantidadPersonas!:number;
  usuario!:any;
  mesasUsuario!:Array<Mesa>;
  mesasReservadas!:Array<Reserva>;
  reservaEliminar: any;
  modalReserva:any;
  reserva!:Reserva;
  constructor(private servicio:MesaService,private router:Router, private servicioReserva:ReservaService) {
    this.mesasDisponibles = new Array<Mesa>();
    this.mesasReservadas = new Array<Reserva>();
    this.mesasUsuario = new Array<Mesa>();
    this.mesa = new Mesa();
    this.reservaEliminar = new Mesa();
    this.modalReserva = new Mesa();
    this.reserva = new Reserva();
    

   }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem("user");  
    this.obtenerMesasDisp();
    this.obtenerMesasReservadas();
    this.mesa.cantidadMesa=this.cantidadPersonas;
    
  }
  obtenerMesasDisp(){
    this.servicio.obtenerMesasDisponibles().subscribe(
      result=>{
        console.log(result)
        let unaMesa = new Mesa();
        result.forEach((element: any )=> {
          Object.assign(unaMesa,element)
          this.mesasDisponibles.push(unaMesa)
          unaMesa = new Mesa();
        });
      },
  
      error=>{
        console.log(error)
      }
    )
  }

async actualizarMesa(){
   this.servicio.editarMesa(this.mesa).subscribe(
    (result:any)=>{
     
    },
    error=>{
      alert(error.msg)
    }
  )
}


async eliminarReserva(mu:Mesa) {
  try {
    mu.usuario = "no tiene";
    mu.disponibilidadReserva = true;
    this.mesa = mu; // deja la mesa lista para actualizar
    await this.actualizarMesa();
  
    this.mesasUsuario = new Array<Mesa>();
    this.obtenerMesasReservadas();

    this.mesasDisponibles = new Array<Mesa>();
    this.obtenerMesasDisp();
  } catch (error) {
    // Manejar el error aquí
    console.error("Ocurrió un error al eliminar la reserva:", error);
  }
}

// reservar(mesaR:Mesa){
//   mesaR.usuario = this.usuario; 
//   mesaR.disponibilidadReserva = false;
//   this.mesa = mesaR;
//   this.actualizarMesa();
  
// this.mesasUsuario = new Array<Mesa>();
// this.obtenerMesasUsuario();
// this.mesasDisponibles = new Array<Mesa>();
// this.obtenerMesasDisp();
// }
// async reservar(mesaR:Mesa) {
//   try {
//     mesaR.usuario = this.usuario;
//     mesaR.disponibilidadReserva = false;
//     this.mesa = mesaR;
//     await this.actualizarMesa();
  
//     this.mesasUsuario = new Array<Mesa>();
//     await this.obtenerMesasUsuario();

//     this.mesasDisponibles = new Array<Mesa>();
//     await this.obtenerMesasDisp();
//   } catch (error) {
//     console.error("Ocurrió un error al reservar la mesa:", error);
//   }
// }

 abrirModalEliminar(reserva: any) {
  this.reservaEliminar = reserva;
}

abrirModalReservar(reserva: any) {
  this.modalReserva = reserva;
}

  async guardarReserva(mesaR:Mesa){

    mesaR.usuario = this.usuario;
    mesaR.disponibilidadReserva = false;
    this.mesa = mesaR;
    await this.actualizarMesa();

  this.reserva.mesa = this.mesa;
  this.reserva.usuario = this.usuario;
this.servicioReserva.crearReserva(this.reserva).subscribe(
  result=>{
   
    alert("se guardo")
  },
  error=>{
    
console.log(error)
  }
)
}


obtenerMesasReservadas(){
console.log(this.usuario)
this.servicioReserva.obtenerReservas(this.usuario).subscribe(
  result=>{
    console.log(result)
    let unaReserva = new Reserva();
    result.forEach((element: any )=> {
      Object.assign(unaReserva,element)
      this.mesasReservadas.push(unaReserva)
      unaReserva = new Reserva();
    });
  },
  error=>{

  }
)
}


}
