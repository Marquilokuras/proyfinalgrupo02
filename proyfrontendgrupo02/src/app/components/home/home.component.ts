import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  reserva() {
    this.router.navigate(["mesa-cliente"])
  }

  bebida() {
    this.router.navigate(["pedido"])
  }

  comentario() {
    this.router.navigate(["comentario-usuario"])
  }

}
