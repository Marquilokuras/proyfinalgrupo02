import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Mesa } from 'src/app/models/mesa';
import { MesaService } from 'src/app/service/mesa.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mesas!: Array<Mesa>;
  mesasDisponibles!: Array<Mesa>;

  constructor(private servicio: MesaService, private router: Router) {
    this.mesas = new Array<Mesa>();
    this.mesasDisponibles = new Array<Mesa>();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType : 'full_pages',
      pageLength : 5,
    }, 
    this.obtenerMesas();
    this.obtenerMesasDisp();
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  } 

  public nuevaMesa() {
    this.router.navigate(["mesa-form", 0])
  }

  obtenerMesas() {
    this.servicio.obtenerMesas().subscribe(
      result => {
        console.log(result)

        let unaMesa = new Mesa();
        result.forEach((element: any) => {
          Object.assign(unaMesa, element)
          this.mesas.push(unaMesa)
          unaMesa = new Mesa();
          
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  public modificarMesa(mesa: Mesa) {
    this.router.navigate(["mesa-form", mesa._id])
  }

  eliminarMesa(mesa: Mesa) {
    this.servicio.borrarMesa(mesa._id).subscribe(
      result => {
        console.log('mesa eliminada correctamente');
        this.mesas = new Array<Mesa>();
        this.obtenerMesas();
      },
      error => {
        alert('Error al eliminar la mesa:');
      }
    );
  }

  obtenerMesasDisp() {
    this.servicio.obtenerMesasDisponibles().subscribe(
      result => {
        console.log(result)
        let unaMesa = new Mesa();
        result.forEach((element: any) => {
          Object.assign(unaMesa, element)
          this.mesasDisponibles.push(unaMesa)
          unaMesa = new Mesa();
        });
      },

      error => {
        console.log(error)
      }
    )
  }



}
