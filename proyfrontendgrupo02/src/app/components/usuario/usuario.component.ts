import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  cambios: string = 'new';
  listUsuario = new Array();

  constructor(public loginService: LoginService,private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
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

  mostrarUsuario() {
    this.loginService.mostrarUsuario().subscribe(
      result => {
        this.listUsuario = result;
        console.log(result)

      },
      error => {
        console.log(error)
      }
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
