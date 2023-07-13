import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';
import { LoginService } from 'src/app/service/login/login.service';
import * as ExcelJS from 'exceljs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})

export class BebidaComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensaje!: String;
  listaBebida: Array<Bebida>
  bebidaSeleccionada!:Bebida;

  public constructor(private loginService: LoginService, private bebidaService: BebidaService, private router: Router, private toastrService:ToastrService) {
    this.listaBebida = new Array<Bebida>();
    if (this.loginService.userLoggedIn()) {
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    },
      this.obtenerBebidas();
  }

  generarExcel() {
    const workbook = new ExcelJS.Workbook();
    const create = workbook.creator = ('Marcos Quinteros');
    const worksheet = workbook.addWorksheet('Registro de Bebidas')

    worksheet.addRow(['Nombre de Bebida', 'Ingredientes de Bebida', 'Tipo de Vaso', 'Disponibilidad', 'Precio de Bebida', 'Imagen de Bebida']);

    for (const bebida of this.listaBebida) {
      const disponibilidad = bebida.disponibilidadBebida ? 'Disponible' : 'No disponible';
      worksheet.addRow([
        bebida.nombreBebida,
        bebida.ingredientesBebida,
        bebida.tipoVasoBebida,
        disponibilidad,
        bebida.precioBebida,
        bebida.imagenBebida
      ]);
    }

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.href = url
      a.download = 'registroBebidas.xlsx';
      a.click();
    });
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public obtenerBebidas() {
    this.bebidaService.obtenerBebidas().subscribe(
      result => {
        this.dtTrigger.next(this.listaBebida);
        let unaBebida = new Bebida();
        result.forEach((element: any) => {
          Object.assign(unaBebida, element)
          this.listaBebida.push(unaBebida)
          unaBebida = new Bebida();
          this.ngOnDestroy()
        });
      },
      error => { }
    )
  }
 

  public nuevoBebida() {
    this.router.navigate(["bebida-form", 0])
  }

  public actualizarBebida(bebida: Bebida) {
    this.router.navigate(["bebida-form", bebida._id])
  }

  public eliminarBebida(bebida: Bebida) {
    this.bebidaService.eliminarBebida(bebida).subscribe(
      result => {
          
          this.toastrService.error(`Se ha eliminado ${bebida.nombreBebida}`, '¡Bebida eliminada con éxito!', {
            closeButton: true,
          });
          setTimeout(() => {
          location.reload();
        }, 1000);
          
      },
      error => { }
    )
  }

  public cambiarEstadoBebida(bebida: Bebida) {
    bebida.disponibilidadBebida = !bebida.disponibilidadBebida;
    this.bebidaService.actualizarBebida(bebida).subscribe()
   
    if(bebida.disponibilidadBebida == true){
      this.mensaje = "Disponible";
    }
    else{
      this.mensaje = "No Disponible";
    }
    this.toastrService.info(`Estado: ${this.mensaje}`, '¡Estado cambiado con éxito!', {
      closeButton: true,
      timeOut: 4000,
      progressBar: true
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  public seleccionarBebida(bebida:Bebida){
    this.bebidaSeleccionada=bebida;
  }

}
