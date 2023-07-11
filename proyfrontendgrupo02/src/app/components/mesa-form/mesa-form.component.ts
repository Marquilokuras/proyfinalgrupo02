import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa';
import { LoginService } from 'src/app/service/login/login.service';
import { MesaService } from 'src/app/service/mesa.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})

export class MesaFormComponent {

  mesa!: Mesa;
  accion: string = "";

  constructor(private servicio: MesaService, private router: Router, private activatedRoute: ActivatedRoute, public usuarioService: LoginService, public toastrService:ToastrService) {
    this.mesa = new Mesa();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.cargarMesa(params['id'])
      }
    });
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  cargarMesa(id: string) {
    this.servicio.obtenerMesa(id).subscribe(
      result => {
        Object.assign(this.mesa, result);
      },
      error => { }
    )
  }

  guardarMesa() {
    this.servicio.crearMesa(this.mesa).subscribe(
      (result: any) => {
        this.router.navigate(["mesa"])
        this.toastrService.success(`Mesa número: ${this.mesa.numeroMesa}`, '¡Mesa creada con exito!', {
          closeButton: true,
          timeOut: 4000,
          progressBar: true
        });
      },
      error => { }
    )
  }

  actualizarMesa() {
    this.servicio.editarMesa(this.mesa).subscribe(
      (result: any) => {

        this.router.navigate(["mesa"])
      },
      error => { }
    )
  }

}
