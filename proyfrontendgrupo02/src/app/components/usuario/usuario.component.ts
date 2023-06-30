import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
 
  //Generar cliente
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;

  nuevoUsuario: boolean = false;
  recuperarUsuario: boolean = false;
  emailUsuario !: string;
  passwordUsuario !: string;
  nombreUsuario !: string;
  apellidoUsuario !: string;
  dniUsuario !: string;
  edadUsuario !: number;
  tipoUsuarioCliente !: string;
 
 
  usuarioNuevo : boolean = false;
  cambios: string = 'new';
  listUsuario = new Array();

  constructor(public loginService: LoginService,private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/usuario';
    this.activatedRoute.params.subscribe(params => {
      if (params['id'].trim()  === ":id") {
        console.log(params['id']);

        this.cambios = "new";
      } else {

        this.cambios = "modificar";
       /*  this.idTicket = params['id'];
        console.log(this.idTicket)
        this.obtenerTickets(this.idTicket); */
        //this.modificarTicket();
      }
    });

    this.mostrarUsuario();

  }

  agregarUsuario(){
    this.usuarioNuevo = true;
  }

  altaUsuarioCliente() {
    this.loginService.altaUsuario(this.emailUsuario, this.passwordUsuario, this.nombreUsuario, this.apellidoUsuario, this.dniUsuario, this.edadUsuario, this.tipoUsuarioCliente).subscribe(
      (result) => {
        var user = result;
        console.log(user)
        this.loginService.login(this.emailUsuario, this.passwordUsuario).subscribe(
          (result) => {
            var user = result;
            if (user.status == 1) {
              //guardamos el user en cookies en el cliente
              sessionStorage.setItem("user", user.email);
              sessionStorage.setItem("userid", user.userid);
              sessionStorage.setItem("tipoUsuario", user.tipoUsuario);
              //redirigimos a home
              this.router.navigateByUrl(this.returnUrl);
            }
          },
          error => {
            alert("Error de conexion");
            console.log("error en conexion");
            console.log(error);
          });
          location.reload();
      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
      }
    );
  }

  cancelar() {
    this.nuevoUsuario = false;
    this.recuperarUsuario = false;
  }

  mostrarUsuario() {
    this.loginService.mostrarUsuario().subscribe(
      result => {
        this.listUsuario = result;

      },
    )
  }

  eliminarUsuario(id: string) {
    this.loginService.eliminarUsuario(id).subscribe(
      result => {
        location.reload();
      },
      error => {
      }
    )
  }

  modificarUsuario(id: string) {
    this.loginService.modificarUsuario(id).subscribe(
      result => {

        console.log(result)

      },
      error => {
        console.log(error)
      }
    )
  }
}
