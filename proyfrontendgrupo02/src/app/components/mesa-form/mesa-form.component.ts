import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { MesaService } from 'src/app/service/mesa.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})
export class MesaFormComponent {
  mesa!:Mesa;
  accion:string="";

  constructor(private servicio:MesaService,private router:Router,private activatedRoute:ActivatedRoute){
    this.mesa= new Mesa();

  }

  ngOnInit():void{

    this.activatedRoute.params.subscribe(params => {
      if(params['id'] == "0"){
        this.accion ="new";
      }else {
        this.accion = "update";
        this.cargarMesa(params['id'])
      }
    });
  }

  cargarMesa(id : string){
    this.servicio.obtenerMesa(id).subscribe(
      result=>{
        console.log(result)
        Object.assign(this.mesa,result);
      },
      error=>{
  
      }
    )
  }

   guardarMesa(){
    this.servicio.crearMesa(this.mesa).subscribe(
      (result:any)=>{
        if (result.status == 1)
        this.router.navigate(["mesa"])
      },
      error=>{
        alert(error.msg)
      }
    )
  }

  actualizarMesa(){
    this.servicio.editarMesa(this.mesa).subscribe(
      (result:any)=>{
        if (result.status == 1)
        this.router.navigate(["mesa"])
      },
      error=>{
        alert(error.msg)
      }
    )
  }

 
}
