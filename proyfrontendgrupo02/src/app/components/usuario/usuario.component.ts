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

  listUsuario = new Array();

  constructor(public loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.mostrarUsuario();

  }

  agregarUsuario() {
    this.router.navigate(['usuario-form'],);
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
    this.router.navigate(['usuario-form', id],);
  }

}
