import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';
import { LoginService } from 'src/app/service/login/login.service';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})
export class BebidaComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaBebida: Array<Bebida>

  public constructor(private loginService: LoginService,
    private bebidaService: BebidaService,
    private router: Router) {
    this.listaBebida = new Array<Bebida>();
    if (this.loginService.userLoggedIn()) {
      //controlo si alguien esta logueado, ejecuto acciones normales
      //controlo si alguien esta logueado, ejecuto acciones normales
    } else {
      alert("Debe validarse e ingresar su usuario y clave");
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
    const workbook = new ExcelJS.Workbook(); //se geneara una hoja nueva
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
        console.log(result)
        this.dtTrigger.next(this.listaBebida);
        let unaBebida = new Bebida();
        result.forEach((element: any) => {
          Object.assign(unaBebida, element)
          this.listaBebida.push(unaBebida)
          unaBebida = new Bebida();
          this.ngOnDestroy()
        });
      },

      error => {
        console.log(error)
      }
    )
  }

  public nuevoBebida() {
    this.router.navigate(["bebida-form", 0])
  }

  public actualizarBebida(bebida: Bebida) {
    console.log(bebida._id)
    this.router.navigate(["bebida-form", bebida._id])
  }

  public eliminarBebida(bebida: Bebida) {
    this.bebidaService.eliminarBebida(bebida).subscribe(
      result => {
        if (result.status == 1) {
          alert(result.msg)
          this.listaBebida = new Array<Bebida>();
          this.obtenerBebidas();
        }
        console.log(result)
      },

      error => {
        console.log(error)
        alert(error.msg)
      }
    )
  }

  public cambiarEstadoBebida(bebida: Bebida) {
    bebida.disponibilidadBebida = !bebida.disponibilidadBebida;
    this.bebidaService.actualizarBebida(bebida).subscribe()
    this.obtenerBebidas()
  }
}
