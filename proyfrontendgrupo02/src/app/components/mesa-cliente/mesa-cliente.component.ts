import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { MesaService } from 'src/app/service/mesa.service';

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
  mesasNoDisponibles!:Array<Mesa>;
  reservaEliminar: any;
  modalReserva:any;
  constructor(private servicio:MesaService,private router:Router) {
    this.mesasDisponibles = new Array<Mesa>();
    this.mesasNoDisponibles = new Array<Mesa>();
    this.mesasUsuario = new Array<Mesa>();
    this.mesa = new Mesa();
    this.reservaEliminar = new Mesa();
    this.modalReserva = new Mesa();

   }

  ngOnInit(): void {
    this.obtenerMesasDisp();
    this.obtenerMesasUsuario();
    this.mesa.cantidadMesa=this.cantidadPersonas;
    this.usuario = sessionStorage.getItem("user");  console.log(this.usuario);
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


  actualizarCantidadMesa() {
    this.mesa.cantidadMesa = 0;
for (let i = this.cantidadPersonas; i > 0; i -= 4) {
  this.mesa.cantidadMesa++;
}
this.mesa.cantidadSilla=this.cantidadPersonas;
}

obtenerMesasUsuario(){
  this.servicio.obtenerMesasNoDisponibles().subscribe(
    result=>{
      console.log(result)
      let unaMesa = new Mesa();
      result.forEach((element: any )=> {
        if (element.usuario == this.usuario){
        Object.assign(unaMesa,element)
        this.mesasUsuario.push(unaMesa)
        unaMesa = new Mesa();}
      });
    },

    error=>{
      console.log(error)
    }
  )
}

// actualizarMesa(){
//   this.servicio.editarMesa(this.mesa).subscribe(
//     (result:any)=>{
     
//     },
//     error=>{
//       alert(error.msg)
//     }
//   )
// }
async actualizarMesa() {
  try {
    await this.servicio.editarMesa(this.mesa).toPromise();
  } catch (error) {
    console.error("Ocurrió un error al actualizar la mesa:", error);
  }
}

// eliminarReserva(mu:Mesa){
//   mu.usuario = "no tiene"; 
//   mu.disponibilidadReserva = true;
//   this.mesa = mu;  // deja la mesa lista para actualizar
// this.actualizarMesa();
// this.mesasUsuario = new Array<Mesa>();
// this.obtenerMesasUsuario();
// this.mesasDisponibles = new Array<Mesa>();
// this.obtenerMesasDisp();
// }
async eliminarReserva(mu:Mesa) {
  try {
    mu.usuario = "no tiene";
    mu.disponibilidadReserva = true;
    this.mesa = mu; // deja la mesa lista para actualizar
    await this.actualizarMesa();
  
    this.mesasUsuario = new Array<Mesa>();
    this.obtenerMesasUsuario();

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
async reservar(mesaR:Mesa) {
  try {
    mesaR.usuario = this.usuario;
    mesaR.disponibilidadReserva = false;
    this.mesa = mesaR;
    await this.actualizarMesa();
  
    this.mesasUsuario = new Array<Mesa>();
    await this.obtenerMesasUsuario();

    this.mesasDisponibles = new Array<Mesa>();
    await this.obtenerMesasDisp();
  } catch (error) {
    console.error("Ocurrió un error al reservar la mesa:", error);
  }
}

obtenerMesasNoDisp(){
  this.servicio.obtenerMesasNoDisponibles().subscribe(
    result=>{
      console.log(result)
      let unaMesa = new Mesa();
      result.forEach((element: any )=> {
        Object.assign(unaMesa,element)
        this.mesasNoDisponibles.push(unaMesa)
        unaMesa = new Mesa();
      });
    },

    error=>{
      console.log(error)
    }
  )
}


 abrirModalEliminar(reserva: any) {
  this.reservaEliminar = reserva;
}

abrirModalReservar(reserva: any) {
  this.modalReserva = reserva;
}
}
