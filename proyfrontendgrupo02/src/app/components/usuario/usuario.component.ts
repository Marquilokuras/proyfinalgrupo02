import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject <any>();

  listUsuario: Usuario[] = [];

  constructor(public loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType : 'full_pages',
      pageLength : 5,
    },

    this.mostrarUsuario();

  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
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
