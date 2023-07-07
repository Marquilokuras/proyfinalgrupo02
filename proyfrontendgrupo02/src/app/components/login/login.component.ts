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

  /* calendarioGoogle: any = null;
  idCalendario: string = "xxxx654654xxxxxxxxxxxx@group.calendar.google.com"; //reemplazar por el id de un calendario compartido en ppio como publico


  fromDate: string = "";
  toDate: string = "";
  event: any =
    {
      kind: "calendar#event",
      status: "confirmed",
      summary: "Reunion de prueba desde angular",
      creator: {
        "email": "marcos.quinteros2003@gmail.com"
      },

      start: {
        dateTime: "2023-06-24T13:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      },

      end: {
        dateTime: "2023-06-24T14:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      }
    } */

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
          //guardamos el user en cookies en el cliente
          sessionStorage.setItem("token", user.token);
          sessionStorage.setItem("user", user.email);
          sessionStorage.setItem("userid", user.userid);
          sessionStorage.setItem("tipoUsuario", user.tipoUsuario);
          //redirigimos a home
          this.router.navigateByUrl(this.returnUrl);
          this.toastrService.success(`¡Bienvenido de nuevo ${user.email}!`);
        } else {
          this.toastrService.warning("¡Usuario o contraseña Incorrecta!");
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

  loginGoogle() {
    this.gooService.login()
  }

  logout() {
    this.gooService.logout();
  }

  token() {
    console.log(this.gooService.getToken());
    alert(this.gooService.getToken())
  }/* 

  verEventos() {
    idCalendario: String;
    this.gooService.getEvents(this.idCalendario).subscribe(
      result => {
        this.calendarioGoogle = result;
        alert(JSON.stringify(this.calendarioGoogle))
      },
      error => {
        console.log(error)
      }
    )
  }


  crearEvento() {

    let fechafrom: Date = new Date(this.fromDate);
    let fechato: Date = new Date(this.toDate);
    this.event.start.dateTime = this.toIsoString(fechafrom);
    this.event.end.dateTime = this.toIsoString(fechato);

    //pasamos por ahora el JSON event en forma estática
    this.gooService.createEvent(this.idCalendario, this.event).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  //METODO interno que se utiliza para obtener el formato
  //que se requiere en la API de google Calendar. Ej. 2022-06-20T17:04:00-03:00
  toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num: any) {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }
 */

}
