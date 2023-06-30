import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  idUsuario!:string;
  
  usuario = new Array();
  usuarioNuevo : boolean = false;
  cambios: string = 'new';

  constructor(public usuarioService: LoginService,private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'].trim() === ":id") {
        console.log(params['id']);

        this.cambios = "new";
      } else {

        this.cambios = "modificar";
        this.idUsuario= params['id'];
        console.log(this.idUsuario)
        this.obtenerUsuarios(this.idUsuario);
      }
    });
  }

  obtenerUsuarios(idUser:string) {
    this.usuarioService.mostrarUsuario().subscribe(
      result => {
        this.usuario= result;
        this.usuario.some(id => id === idUser);
        const array = this.usuario.find(item => item._id === idUser);
        console.log(array)
       /*  this.precioTicket = array.precioTicket
        this.categoria  = array.categoriaEspectador;
        this.fechaTicket = array.fechaCompra;
        this.idEspectador = array.espectador._id; */
      },
      error => {
        console.log(error);
      }
    )
  }

  altaUsuario() {
    this.usuarioService.altaUsuario(this.emailUsuario, this.passwordUsuario, this.nombreUsuario, this.apellidoUsuario, this.dniUsuario, this.edadUsuario, this.tipoUsuarioCliente).subscribe(
      (result) => {

      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
      }
    );
  }



  cancelar() {
    
  }

  modificarUsuario(){

  }


}
