import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
          this.verificar(unaPromocion)
          this.listaPromocion.push(unaPromocion)
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
        unaPromocion.fechaPromocion = new Date(unaPromocion.fechaPromocion);
        if (unaPromocion.fechaPromocion < new Date()) {
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
        if (result.status == 1) {
          this.listaPromocion = new Array<Promocion>();
          this.obtenerPromociones();
        }
      },
      error => { }
    )
  }

  cambiarEstadoPromocion(promo:Promocion){
    promo.fechaPromocion = new Date(promo.fechaPromocion);
    if (promo.fechaPromocion < new Date()) {
      this.toastrService.warning("Promocion caduco... cambiar fecha antes")
    }else{
      promo.disponibilidadPromocion=!promo.disponibilidadPromocion
      this.promocionService.actualizarPromocion(promo).subscribe();
      this.obtenerPromociones;
    }
  }
  
}
