import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  mostrarContrasenia: boolean = false;
  userform: Usuario = new Usuario();
  returnUrl!: string;

  nuevoUsuario: boolean = false;
  recuperarUsuario: boolean = false;
  emailUsuario !: string;
  passwordUsuario !: string;
  nombreUsuario !: string;
  apellidoUsuario !: string;
  dniUsuario !: string;
  edadUsuario !: number;
  tipoUsuarioCliente: string = "cliente"

  emailRecuperado !: string;
  dniRecuperado !: string;
  constrasenaRecuperada !: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private toastrService:ToastrService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {
    this.loginService.login(this.userform.email, this.userform.password).subscribe(
      (result) => {
        var user = result;
        if (user.status == 1) {
          //guardamos el user en cookies en el cliente
          sessionStorage.setItem("token", user.token);
          sessionStorage.setItem("user", user.email);
          sessionStorage.setItem("userid", user.userid);
          sessionStorage.setItem("tipoUsuario", user.tipoUsuario);
          //redirigimos a home
          this.router.navigateByUrl(this.returnUrl);
          this.toastrService.success(`¡Bienvenido de nuevo ${user.email}!`);
        } else {
          this.toastrService.warning("¡Usuaario o contraseña Incorrecta!");
        }
      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
        this.toastrService.warning("Error al Iniciar Sesion");
      });
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
      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
      }
    );
  }

  inscribirse() {
    this.nuevoUsuario = true;
    this.recuperarUsuario = false;
  }

  cancelar() {
    this.nuevoUsuario = false;
    this.recuperarUsuario = false;
    this.mostrarContrasenia = false;
  }

  recuperar() {
    this.emailRecuperado = ""
    this.dniRecuperado = ""
    this.constrasenaRecuperada = ""
    this.nuevoUsuario = false;
    this.recuperarUsuario = true;
    this.mostrarContrasenia = false;
  }

  recuperarContrasena() {
    this.loginService.recuperarContrasena(this.emailRecuperado, this.dniRecuperado).subscribe(
      result => {
        console.log(result)
        this.constrasenaRecuperada = result.password
        this.mostrarContrasenia = true;
      },
      error => {
      }
    )
  }
}
