import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';

@Component({
  selector: 'app-bebida-form',
  templateUrl: './bebida-form.component.html',
  styleUrls: ['./bebida-form.component.css']
})
export class BebidaFormComponent {
  bebida:Bebida;
  accion:string="";
  constructor(private activatedRoute: ActivatedRoute,
              private bebidaService: BebidaService,
              private router:Router){
    this.bebida = new Bebida();
  }

ngOnInit():void{
  this.activatedRoute.params.subscribe(params =>{
    if (params['id']=="0"){
      this.accion = "new";
    }else{
      this.accion = "update";
      this.cargarBebida(params['id']);
    }
  })
}
  cargarBebida(id:string) {
    this.bebidaService.obtenerBebida(id).subscribe(
      result=>{
        console.log(result);
        Object.assign(this.bebida,result)
      },
      error=>{
        console.log(error);
      }
    )
  }

  public guardarBebida(){
    this.bebidaService.guardarBebida(this.bebida).subscribe(
      result=>{
        if(result.status==1){
          alert(result.msg)
          this.router.navigate(["bebida"])
        }
        console.log(result);
      },
      error=>{
        console.log(error);
        alert(error.msg)
      }
    )
  }

  public actualizarBebida(){
    console.log(this.bebida)
   this.bebidaService.actualizarBebida(this.bebida).subscribe(
    result=>{
      console.log(this.bebida);
      if(result.status==1){
        alert(result.msg)
        this.router.navigate(["bebida"])
      }
      console.log(result);
    },
    error=>{
      console.log(error);
      alert(error.msg)
    }
   )
  }
}
