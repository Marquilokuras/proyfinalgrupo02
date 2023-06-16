import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})
export class BebidaComponent {

  listaBebida: Array<Bebida>

  public constructor (private bebidaService:BebidaService,
                      private router:Router){
    this.listaBebida = new Array<Bebida>();
  }
  
  ngOnInit(){
    this.obtenerBebidas();
  }


 public obtenerBebidas() {
    this.bebidaService.obtenerBebidas().subscribe(
      result=>{
        console.log(result)
        let unaBebida = new Bebida();
        result.forEach((element: any )=> {
          Object.assign(unaBebida,element)
          this.listaBebida.push(unaBebida)
          unaBebida = new Bebida();
        });
      },
  
      error=>{
        console.log(error)
      }
    )
  }

  public nuevoBebida(){
    this.router.navigate(["bebida-form",0])
  }

  public actualizarBebida(bebida:Bebida){
    console.log(bebida._id)
    this.router.navigate(["bebida-form",bebida._id])
  }

  public eliminarBebida(bebida: Bebida){
    this.bebidaService.eliminarBebida(bebida).subscribe(
      result=>{
        if(result.status==1){
          alert(result.msg)
          this.obtenerBebidas();
        }
        console.log(result)
      },
  
      error=>{
        console.log(error)
        alert(error.msg)
      }
    )
  }
}
