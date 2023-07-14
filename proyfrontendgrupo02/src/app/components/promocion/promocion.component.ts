import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { Promocion } from 'src/app/models/promocion/promocion';
import { PromocionService } from 'src/app/service/promocion/promocion.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})

export class PromocionComponent implements OnInit {

  listaPromocion: Array<Promocion>;

  constructor(private promocionService: PromocionService,
              private router: Router,
              private toastrService:ToastrService,) { 
    this.listaPromocion = new Array<Promocion>();
  }

  ngOnInit(): void {
    this.obtenerPromociones();
  }

   public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  public obtenerPromociones() {
    this.promocionService.obtenerPromociones().subscribe(
      result => {
        let unaPromocion = new Promocion()
        result.forEach((element: any) => {
          Object.assign(unaPromocion, element)
          if(unaPromocion.bebidas.length == 0){
            this.promocionService.eliminarPromocion(unaPromocion)
          }else{
            this.verificar(unaPromocion)
            this.listaPromocion.push(unaPromocion)
          }
          
          unaPromocion = new Promocion();
        });
      },
      error => { }
    )
  }

  

  verificar(unaPromocion: Promocion) {
    let unaBebida = new Bebida();
    unaPromocion.bebidas.forEach((element: any) => {
      Object.assign(unaBebida, element)
      if (unaBebida.disponibilidadBebida == false) {
        unaPromocion.disponibilidadPromocion = false;
        this.promocionService.actualizarPromocion(unaPromocion).subscribe()
      }else{ 
        
        const fecha = new Date(unaPromocion.fechaPromocion);
        if (fecha < new Date()) {
          unaPromocion.disponibilidadPromocion=false;
          this.promocionService.actualizarPromocion(unaPromocion).subscribe()
        }
      }
      unaBebida = new Bebida();
    });
  }

  public nuevoPromocion() {
    this.router.navigate(["promocion-form", 0])
  }

  public actualizarPromocion(promocion: Promocion) {
    this.router.navigate(["promocion-form", promocion._id])
  }

  public eliminarPromocion(promocion: Promocion) {
    this.promocionService.eliminarPromocion(promocion).subscribe(
      result => {
        this.toastrService.error(`Se ha eliminado ${promocion.nombrePromocion}`, '¡Bebida eliminada con éxito!', {
          closeButton: true,
        });
       /* setTimeout(() => {
          location.reload();
        }, 1000);*/
        this.listaPromocion=[];
        this.obtenerPromociones();
        
      },
      error => { }
    )
  }

  cambiarEstadoPromocion(promo:Promocion){
    const fecha = new Date(promo.fechaPromocion);
   // let fechaActual = format(this.fechaPedido, 'dd/MM/yyyy HH:mm:ss')
    console.log("fecha del objeto: "+promo.fechaPromocion)
    console.log("fecha actual: "+new Date())
    if (fecha < new Date()) {
      this.toastrService.warning("Promocion caducada... cambiar fecha antes")
    }else{
      if(this.verificarDisponibilidadBebida(promo.bebidas)==false){
        this.toastrService.warning("Error al cambiar disponibilidad... Bebida no dispoble/s")
      }else{
        promo.disponibilidadPromocion=!promo.disponibilidadPromocion
        this.promocionService.actualizarPromocion(promo).subscribe();
        this.toastrService.success("Se cambio estado con exito")
        this.listaPromocion=[]
        this.obtenerPromociones();
      }
    }
  }

  public verificarDisponibilidadBebida(bebidas:Array<Bebida>):boolean{
    let bandera:boolean=true;
    bebidas.forEach((element: Bebida) => {
      if (element.disponibilidadBebida == false) {
        bandera=false;
      }
    });

    return bandera;
  }
  
}
