import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Usuario } from 'src/app/models/usuario/usuario';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

//export type ChartOptions =  {
  //series: ApexNonAxisChartSeries | any[];

import { LoginService } from 'src/app/service/login/login.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
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

  contadorEdadCliente: number = 0;
  contadorEdadGestor: number = 0;
  contadorEdadAdmin: number = 0;

  constructor(private usuario: LoginService) {
  }

  ngOnInit(): void {
    //this.estadistica();
    this.obtenerEstadistica();
  }

  obtenerEstadistica() {
    this.usuario.mostrarUsuario().subscribe(result => {
      const usuarios = result;

      let contadorEdadCliente = 0;
      let contadorEdadGestor = 0;
      let contadorEdadAdmin = 0;
      let totalClientes = 0;
      let totalGestores = 0;
      let totalAdmins = 0;

      for (let i = 0; i < usuarios.length; i++) {
        const tipoUsuario = usuarios[i].tipoUsuario;
        const edad = usuarios[i].edadUsuario;

        if (tipoUsuario === "cliente") {
          contadorEdadCliente += edad;
          totalClientes++;
        }

        if (tipoUsuario === "gestor") {
          contadorEdadGestor += edad;
          totalGestores++;
        }

        if (tipoUsuario === "administrador") {
          contadorEdadAdmin += edad;
          totalAdmins++;
        }
      }

      let promedioCliente = contadorEdadCliente / totalClientes;
      let promedioGestor = contadorEdadGestor / totalGestores;
      let promedioAdmin = contadorEdadAdmin / totalAdmins;

      promedioCliente = Math.floor(promedioCliente);
      promedioGestor = Math.floor(promedioGestor);
      promedioAdmin = Math.floor(promedioAdmin);

      this.chartOptions = {
        series: [
          {
            name: "Edad",
            data: [
              promedioCliente,
              promedioGestor,
              promedioAdmin
            ]
          },
          {
            name: "Cantidad de Usuarios",
            data: [totalClientes, totalGestores, totalAdmins]
          },
          /*{
            name: "Free Cash Flow",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }*/
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 0
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Cliente",
            "Gestor",
            "Administrador"
          ]
        },
        yaxis: {
          title: {
            text: "Edad Promedio"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " ";
            }
          }
        }
      };
    });
  }


}


