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
  constructor(private servicio:MesaService,private router:Router) {
    this.mesasDisponibles = new Array<Mesa>();
    this.mesa = new Mesa();
   }

  ngOnInit(): void {
    this.obtenerMesasDisp();
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


  actualizarCantidadMesa() {
    this.mesa.cantidadMesa = 0;
for (let i = this.cantidadPersonas; i > 0; i -= 4) {
  this.mesa.cantidadMesa++;
}
this.mesa.cantidadSilla=this.cantidadPersonas;
}
}
