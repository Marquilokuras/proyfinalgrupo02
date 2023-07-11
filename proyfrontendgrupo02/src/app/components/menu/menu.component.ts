import { Component, OnInit } from '@angular/core';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  router: any;
  carta = new Array();

  constructor(public loginService: LoginService, public bebidaService: BebidaService) {
  }

  ngOnInit(): void {
    this.obtenerBebidas();
  }

  obtenerBebidas() {
    this.bebidaService.obtenerBebidas().subscribe(
      result => {
        let unaBebida = new Bebida();
        result.forEach((element: any) => {
          Object.assign(unaBebida, element)
          if (unaBebida.disponibilidadBebida == true) {
            this.carta.push(unaBebida)
          }
          unaBebida = new Bebida();
        });
      },
      error => { }
    )
  }

}
