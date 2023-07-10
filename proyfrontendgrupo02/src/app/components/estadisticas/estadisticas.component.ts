import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Usuario } from 'src/app/models/usuario/usuario';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

export type ChartOptions =  {
  series: ApexNonAxisChartSeries | any[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  chartOptions!: ChartOptions;
  listUsuario: Usuario[] = [];
  tipoUsuario: string = ""
  contadorAdmin: number = 0;
  contadorGestor: number = 0;
  contadorCliente: number = 0;



  constructor(public loginService: LoginService) {
    this.mostrarUsuario();
  }

  ngOnInit(): void {

  }
  mostrarUsuario() {
    this.loginService.mostrarUsuario().subscribe(
      result => {
        this.listUsuario = result;
        this.cantidad();
        this.estadistica()
      },
    )
  }

  cantidad() {
    this.listUsuario.forEach(usuario => {
      if (usuario.tipoUsuario === "administrador") {
        this.contadorAdmin++;
      } else if (usuario.tipoUsuario === "gestor") {
        this.contadorGestor++;
      } else if (usuario.tipoUsuario === "cliente") {
        this.contadorCliente++;
      }
    });
  }

  estadistica() {
    this.chartOptions = {
      series: [this.contadorCliente, this.contadorAdmin, this.contadorGestor],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Cliente", "Administrador", "Gestor"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}


