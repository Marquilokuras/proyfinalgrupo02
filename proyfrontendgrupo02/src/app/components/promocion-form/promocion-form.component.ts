import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { Promocion } from 'src/app/models/promocion/promocion';
import { BebidaService } from 'src/app/service/bebida.service';
import { PromocionService } from 'src/app/service/promocion/promocion.service';

@Component({
  selector: 'app-promocion-form',
  templateUrl: './promocion-form.component.html',
  styleUrls: ['./promocion-form.component.css']
})

export class PromocionFormComponent implements OnInit {

  promocion: Promocion
  accion: string = "";
  listaBebida: Array<Bebida>
  today: Date
  bandera!:boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private promocionService: PromocionService,
    private router: Router,
    private bebidaService: BebidaService,
    private toastrService: ToastrService) {
    this.promocion = new Promocion()
    this.listaBebida = new Array<Bebida>();
    this.obtenerBebidas()
    this.today = new Date();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.promocion.disponibilidadPromocion = true
      } else {
        this.accion = "update";
        this.cargarPromocion(params['id']);
        //this.formatDate(this.promocion.fechaPromocion)
       
      }
    })
  }

  obtenerBebidas() {
    this.bebidaService.obtenerBebidasDisponibles().subscribe(
      result => {
        let unaBebida = new Bebida();
        result.forEach((element: any) => {
          Object.assign(unaBebida, element)
          this.listaBebida.push(unaBebida)
          unaBebida = new Bebida();
        });
      },
      error => { }
    )
  }

   cargarPromocion(id: string) {
  this.promocionService.obtenerPromocion(id).subscribe(
      result => {
        Object.assign(this.promocion, result)
        this.bandera=this.verificarDisponibilidad();
      },
      error => { }
    )
  }

  guardarPromocion() {
    if (this.promocion.bebidas.length != 0) {
      this.promocionService.guardarPromocion(this.promocion).subscribe(
        result => {
          this.router.navigate(["promocion"])
        },
        error => {}
      )
    } else {
      this.toastrService.warning("Debe agregar bebida ")
    }
  }

  actualizarPromocion() {
    if (this.promocion.bebidas.length != 0) {
      this.promocionService.actualizarPromocion(this.promocion).subscribe(
        result => {
          
            this.router.navigate(['promocion'])
          
        },
        error => {}
      )
    } else {
      this.toastrService.warning("Debe agregar bebida ")
    }
  }

  agregarBebida(id: string) {
    var bebidaEncontrada: any
    bebidaEncontrada = this.listaBebida.find(bebida => bebida._id === id)
    this.promocion.bebidas.push(bebidaEncontrada);
    this.toastrService.success("Se agrego bebida")

    let unaBebida = new Bebida();
    this.promocion.totalPrecioBebidasSinDescuento = 0
    this.promocion.bebidas.forEach((element: any) => {
      Object.assign(unaBebida, element)
      this.promocion.totalPrecioBebidasSinDescuento = this.promocion.totalPrecioBebidasSinDescuento += unaBebida.precioBebida;
      unaBebida = new Bebida();
    });
    this.actualizarPrecio()
  }

  eliminarBebida(id: string) {
    var bebidaEncontrada: any
    bebidaEncontrada = this.promocion.bebidas.find(bebida => bebida._id === id)

    if (bebidaEncontrada) {
      const index = this.promocion.bebidas.indexOf(bebidaEncontrada);

      if (index !== -1) {
        this.promocion.bebidas.splice(index, 1);
      }

      let unaBebida = new Bebida();
      this.promocion.totalPrecioBebidasSinDescuento = 0
      this.promocion.bebidas.forEach((element: any) => {
        Object.assign(unaBebida, element)
        this.promocion.totalPrecioBebidasSinDescuento = this.promocion.totalPrecioBebidasSinDescuento += unaBebida.precioBebida;
        unaBebida = new Bebida();
      });
      this.actualizarPrecio()
    }
  }

  actualizarPrecio() {
    if (this.promocion.totalPrecioBebidasSinDescuento > 0 && this.promocion.descuento > 0) {
      this.promocion.totalPrecioPromocion = this.promocion.totalPrecioBebidasSinDescuento - this.promocion.totalPrecioBebidasSinDescuento * this.promocion.descuento;
    } else {
      this.promocion.totalPrecioPromocion = this.promocion.totalPrecioBebidasSinDescuento
    }
  }

  formatDate(date: Date): string {
    if (!date) return "";
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options as Intl.DateTimeFormatOptions);
  }

  verificarDisponibilidad():boolean {
    let bandera: boolean=true;
    if (this.promocion.bebidas.length>0) {
      this.promocion.bebidas.forEach((element: Bebida) => {
        if (element.disponibilidadBebida == false) {
          bandera=false;
        }
      });
    } 
    this.promocion.fechaPromocion = new Date(this.promocion.fechaPromocion);
    console.log("fecha de mi promo"+this.promocion.fechaPromocion)
    console.log("fecha actual"+new Date())
    if (this.promocion.fechaPromocion < new Date()) {
    bandera=false
   }
   this.promocion.fechaPromocion = new Date(this.promocion.fechaPromocion);
    return bandera;
  }
  
}
