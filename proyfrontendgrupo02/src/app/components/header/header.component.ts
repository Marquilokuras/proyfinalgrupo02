import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario !: string;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  //Se desloguea
  logout() {
    this.loginService.logout();
  }

  // Se obtiene el tipo de Usuario
  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }


}
