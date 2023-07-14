import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login/login.service';
import { GooService } from 'src/app/service/goo/goo.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private gooService: GooService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.gooService.configureSingleSignOne();
  }

  login() {
    this.loginService.login(this.userform.email, this.userform.password).subscribe(
      (result) => {
        var user = result;
        if (user.status == 1) {
          sessionStorage.setItem("token", user.token);
          sessionStorage.setItem("user", user.email);
          sessionStorage.setItem("userid", user.userid);
          sessionStorage.setItem("tipoUsuario", user.tipoUsuario);
          this.router.navigateByUrl(this.returnUrl);
          this.toastrService.success(`¡Bienvenido de nuevo ${user.email}!`);
        } else {
          this.toastrService.warning("¡Usuario o contraseña Incorrecta!");
        }
      },
      error => {
        this.toastrService.warning("Error al Iniciar Sesion");
      });
  }

  altaUsuarioCliente() {
    this.loginService.altaUsuario(this.emailUsuario, this.passwordUsuario, this.nombreUsuario, this.apellidoUsuario, this.dniUsuario, this.edadUsuario, this.tipoUsuarioCliente).subscribe(
      (result) => {
        this.loginService.login(this.emailUsuario, this.passwordUsuario).subscribe(
          (result) => {
            var user = result;

            if (user.status == 1) {
              sessionStorage.setItem("token", user.token);
              sessionStorage.setItem("user", user.email);
              sessionStorage.setItem("userid", user.userid);
              sessionStorage.setItem("tipoUsuario", user.tipoUsuario);
              this.router.navigateByUrl(this.returnUrl);
            }
          },
          error => { });
      },
      error => { }
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
        this.constrasenaRecuperada = result.password
        this.mostrarContrasenia = true;
      },
      error => { }
    )
  }

  loginGoogle() {
    this.gooService.login()
  }

  logout() {
    this.gooService.logout();
  }

  token() {
    alert(this.gooService.getToken())
  }

}
