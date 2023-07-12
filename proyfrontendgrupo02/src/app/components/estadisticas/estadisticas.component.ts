import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};
export type chartOptionsTorta = {
  series: ApexNonAxisChartSeries | any[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsPedido = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};

export type ChartOptionsPorPedido = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  chartOptions!: ChartOptions;
  chartOptionsTorta!: chartOptionsTorta;
  chartOptionsPedido!: ChartOptionsPedido;
  chartOptionsPorPedido!: ChartOptionsPorPedido;
  contadorEdadCliente: number = 0;
  contadorEdadGestor: number = 0;
  contadorEdadAdmin: number = 0;
  total: number = 0;
  totalMojito: number = 0;
  totalBeach: number = 0;
  totalGaribaldi: number = 0;
  totalGin: number = 0;
  totalNegroni: number = 0;

  constructor(private usuario: LoginService, private pedido: PedidoService) {
  }

  ngOnInit(): void {
    this.obtenerEstadistica();
    this.obtenerEstadisticaPedido();
    this.obtenerEstadisticaPorPedido();
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
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
            name: "Edad Promedio",
            data: [
              promedioCliente,
              promedioGestor,
              promedioAdmin
            ]
          },
          {
            name: "Cantidad de Usuarios",
            data: [totalClientes, totalGestores, totalAdmins]
          }
        ],
        chart: {
          type: "bar",
          height: 350,
          width: 800
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
            text: "Valores"
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

      this.chartOptionsTorta = {
        series: [totalClientes, totalAdmins, totalGestores],
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
    });
  }

  obtenerEstadisticaPedido() {
    this.pedido.mostrarPedido().subscribe(result => {
      const pedidos = result;
      this.total = 0;

      for (let i = 0; i < pedidos.length; i++) {
        this.total += pedidos[i].totalPedido;
      }

      this.chartOptionsPedido = {
        series: [
          {
            name: "Precio",
            data: [
              this.total
            ]
          },
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
            "Precio Pedidos",
          ]
        },
        yaxis: {
          title: {
            text: "Total Recaudado"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " ";
            }
          }
        }
      };
    });
  }

  obtenerEstadisticaPorPedido() {
    this.pedido.mostrarPedido().subscribe(result => {
      const pedidos = result;
      this.total = 0;
      this.totalMojito = 0;
      this.totalBeach = 0;
      this.totalGaribaldi = 0;
      this.totalGin = 0;
      this.totalNegroni = 0;
  
      for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i].bebidasPedido;
        if (pedido) {
          for (let j = 0; j < pedido.length; j++) {
            if (pedido[j] && pedido[j].bebida && pedido[j].bebida.nombreBebida) {
              switch (pedido[j].bebida.nombreBebida) {
                case "Mojito":
                  this.totalMojito++;
                  break;
                case "Gin Tonic":
                  this.totalGin++;
                  break;
                case "Sex on the beach":
                  this.totalBeach++;
                  break;
                case "Garibaldi":
                  this.totalGaribaldi++;
                  break;
                case "Negroni":
                  this.totalNegroni++;
                  break;
                default:
                  break;
              }
            }
          }
        }
      }
  
      this.chartOptionsPorPedido = {
        series: [
          {
            name: "Bebidas pedidas",
            data: [
              this.totalGin,
              this.totalMojito,
              this.totalBeach,
              this.totalGaribaldi,
              this.totalNegroni
            ]
          },
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
            "Gin Tonic",
            "Mojito",
            "Sex on the beach",
            "Garibaldi",
            "Negroni"
          ]
        },
        yaxis: {
          title: {
            text: "Cantidad de Bebidas Solicitadas"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + "";
            }
          }
        }
      };
    });
  }
  
}
