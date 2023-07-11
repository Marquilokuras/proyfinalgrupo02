import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login/login.service';
import * as ExcelJS from 'exceljs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listUsuario: Usuario[] = [];

  constructor(public loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router,private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    },

      this.mostrarUsuario();
  }

  generarExcel() {
    const workbook = new ExcelJS.Workbook();
    const create = workbook.creator = ('Marcos Quinteros');
    const worksheet = workbook.addWorksheet('Lista de Usuarios');
    worksheet.addRow(['Nombre', 'Apellido', 'Email', 'DNI', 'Edad', 'Tipo de Usuario']);

    for (const usuario of this.listUsuario) {
      worksheet.addRow([
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        usuario.dniUsuario,
        usuario.edadUsuario,
        usuario.tipoUsuario
      ]);
    }

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'listaUsuarios.xlsx';
      a.click();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  agregarUsuario() {
    this.router.navigate(['usuario-form'],);
  }

  mostrarUsuario() {
    this.loginService.mostrarUsuario().subscribe(
      result => {
        this.listUsuario = result;
        this.dtTrigger.next(this.listUsuario);
      },
    )
  }

  eliminarUsuario(id: string) {
    this.loginService.eliminarUsuario(id).subscribe(
      result => {
        this.toastrService.error("Eliminando Usuario...");
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => { }
    )
  }

  modificarUsuario(id: string) {
    this.router.navigate(['usuario-form', id],);
  }

}
