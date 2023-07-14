import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Mesa } from 'src/app/models/mesa';
import { Reserva } from 'src/app/models/reserva/reserva';
import { MesaService } from 'src/app/service/mesa.service';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

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
  usuario!: any;
  reservas!: Array<Reserva>

  constructor(private servicio: MesaService, private router: Router, private servicioR: ReservaService,private toastrService:ToastrService) {
    this.mesas = new Array<Mesa>();
    this.mesasDisponibles = new Array<Mesa>();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    };
    this.usuario = sessionStorage.getItem("user");
    this.obtenerMesas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public nuevaMesa() {
    this.router.navigate(["mesa-form", 0])
  }

  obtenerMesas() {
    this.servicio.obtenerMesas().subscribe(
      result => {
        this.dtTrigger.next(this.mesas);
        let unaMesa = new Mesa();
        result.forEach((element: any) => {
          Object.assign(unaMesa, element)
          this.mesas.push(unaMesa)
          unaMesa = new Mesa();
          this.ngOnDestroy()
        });
      },
      error => { }
    )
  }

  public modificarMesa(mesa: Mesa) {
    this.router.navigate(["mesa-form", mesa._id])
  }

  eliminarMesa(mesa: Mesa) {
    this.servicio.borrarMesa(mesa._id).subscribe(
      result => {
        this.mesas = new Array<Mesa>();
        this.toastrService.success('¡Mesa eliminada con exito!');
          setTimeout(() => {
            location.reload();
          }, 1000);
      },
      error => { }
    );
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

}
