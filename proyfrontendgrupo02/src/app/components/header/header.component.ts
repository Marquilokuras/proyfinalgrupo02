import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  usuario !: string;

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }


}
