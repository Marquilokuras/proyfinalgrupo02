import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  router: any;

  constructor(public loginService: LoginService) { 
    if(this.loginService.userLoggedIn()){
      //controlo si alguien esta logueado, ejecuto acciones normales
      //controlo si alguien esta logueado, ejecuto acciones normales
       } else {
       alert("Debe validarse e ingresar su usuario y clave");
       this.router.navigate(['login']);
       }
      
  }

  ngOnInit(): void {
  }

}
