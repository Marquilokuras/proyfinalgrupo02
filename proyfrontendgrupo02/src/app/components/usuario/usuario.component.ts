import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  listUsuario = new Array();

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
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

}
