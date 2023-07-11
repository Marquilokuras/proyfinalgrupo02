import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {

  nuevoUsuario: boolean = false;
  recuperarUsuario: boolean = false;
  emailUsuario !: string;
  passwordUsuario !: string;
  nombreUsuario !: string;
  apellidoUsuario !: string;
  dniUsuario !: string;
  edadUsuario !: number;
  tipoUsuarioCliente !: string;
  idUsuario!: string;

  usuario = new Array();
  usuarioNuevo: boolean = false;
  cambios: string = 'new';

  constructor(public usuarioService: LoginService, private activatedRoute: ActivatedRoute, private router: Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'].trim() === ":id") {
        this.cambios = "new";
      } else {
        this.cambios = "modificar";
        this.idUsuario = params['id'];
        this.obtenerUsuarios(this.idUsuario);
      }
    });
  }

  obtenerUsuarios(idUser: string) {
    this.usuarioService.mostrarUsuario().subscribe(
      result => {
        this.usuario = result;
        this.usuario.some(id => id === idUser);
        const array = this.usuario.find(item => item._id === idUser);
        this.apellidoUsuario = array.apellido;
        this.nombreUsuario = array.nombre;
        this.emailUsuario = array.email;
        this.passwordUsuario = array.password;
        this.dniUsuario = array.dniUsuario;
        this.edadUsuario = array.edadUsuario;
        this.tipoUsuarioCliente = array.tipoUsuario;
      },
      error => { }
    )
  }

  altaUsuario() {
    this.usuarioService.altaUsuario(this.emailUsuario, this.passwordUsuario, this.nombreUsuario, this.apellidoUsuario, this.dniUsuario, this.edadUsuario, this.tipoUsuarioCliente).subscribe(
      (result) => {

        this.toastrService.success('Agregado Correctamente','Nuevo Usuario',{
          progressBar:true,
          closeButton:true
        })

      }
    );
  }

  cancelar() {
    location.reload();
  }

  modificarUsuario() {
    this.usuarioService.modificarUsuario(this.idUsuario, this.apellidoUsuario, this.nombreUsuario, this.emailUsuario, this.passwordUsuario, this.dniUsuario, this.edadUsuario, this.tipoUsuarioCliente).subscribe(
      result => {
        this.toastrService.info('','Usuario Modificado',{
          progressBar:true,
          closeButton:true
        })
       },
      error => { }
    )
  }

}
