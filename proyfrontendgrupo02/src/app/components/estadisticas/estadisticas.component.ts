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

export type chartOptionsTortaHorario = {
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


export type ChartOptionsPorMesPedido = {
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

export type ChartOptionsPorDiaPedido = {
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
  chartOptionsTortaHorario!: chartOptionsTorta;
  chartOptionsPedido!: ChartOptionsPedido;
  chartOptionsPorPedido!: ChartOptionsPorPedido;
  chartOptionsPorMesPedido!: ChartOptionsPorMesPedido;
  chartOptionsPorDiaPedido !: ChartOptionsPorDiaPedido;
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
    this.obtenerEstadisticaPorMesPedido();
    this.obtenerEstadisticaPorDiaPedido();
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
                  this.totalMojito = this.totalMojito + pedido[j].cantidadBebidas;
                  break;
                case "Gin Tonic":
                  this.totalGin = this.totalGin + pedido[j].cantidadBebidas;
                  break;
                case "Blue Label de Johnnie Walker":
                  this.totalBeach = this.totalBeach + pedido[j].cantidadBebidas;
                  break;
                case "Garibaldi":
                  this.totalGaribaldi = this.totalGaribaldi + pedido[j].cantidadBebidas;
                  break;
                case "Negroni":
                  this.totalNegroni = this.totalNegroni + pedido[j].cantidadBebidas;
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
            "Blue Label de Johnnie Walker",
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

  obtenerEstadisticaPorMesPedido() {
    this.pedido.mostrarPedido().subscribe(result => {
      const pedidos = result;
      let totalEnero = 0;
      let totalFebrero = 0;
      let totalMarzo = 0;
      let totalAbril = 0;
      let totalMayo = 0;
      let totalJunio = 0;
      let totalJulio = 0;
      let totalAgosto = 0;
      let totalSeptiembre = 0;
      let totalOctubre = 0;
      let totalNoviembre = 0;
      let totalDiciembre = 0;
      let totalTarde = 0;
      let totalNoche = 0;
      let totalAnochecer = 0;

      for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];

        if (pedido) {
          let partesFecha = pedido.fechaPedido.split(" ");
          let fechaSinHora = partesFecha[0];
          let partesFechaSinHora = fechaSinHora.split("/");
          let mes = parseInt(partesFechaSinHora[1]);

          switch (mes) {
            case 1:
              totalEnero = totalEnero + pedido.totalPedido;
              break;
            case 2:
              totalFebrero = totalFebrero + pedido.totalPedido;
              break;
            case 3:
              totalMarzo = totalMarzo + pedido.totalPedido;
              break;
            case 4:
              totalAbril = totalAbril + pedido.totalPedido;
              break;
            case 5:
              totalMayo = totalMayo + pedido.totalPedido;
              break;
            case 6:
              totalJunio = totalJunio + pedido.totalPedido;
              break;
            case 7:
              totalJulio = totalJulio + pedido.totalPedido;
              break;
            case 8:
              totalAgosto = totalAgosto + pedido.totalPedido;
              break;
            case 9:
              totalSeptiembre = totalSeptiembre + pedido.totalPedido;
              break;
            case 10:
              totalOctubre = totalOctubre + pedido.totalPedido;
              break;
            case 11:
              totalNoviembre = totalNoviembre + pedido.totalPedido;
              break;
            case 12:
              totalDiciembre = totalDiciembre + pedido.totalPedido;
              break;
            default:
              break;
          }

          let hora = parseInt(partesFecha[1].split(":")[0]);
          if (hora >= 18 && hora <= 20) {
            totalTarde += pedido.totalPedido;
          } else if (hora >= 0 && hora <= 4) {
            totalAnochecer += pedido.totalPedido;
          } else {
            if (hora >= 20 && hora <= 23 && parseInt(partesFecha[1].split(":")[1]) >= 1) {
              totalNoche += pedido.totalPedido;
            }
          }
        }
      }

      this.chartOptionsPorMesPedido = {
        series: [
          {
            name: "Ganancia por Mes",
            data: [
              totalEnero,
              totalFebrero,
              totalMarzo,
              totalAbril,
              totalMayo,
              totalJunio,
              totalJulio,
              totalAgosto,
              totalSeptiembre,
              totalOctubre,
              totalNoviembre,
              totalDiciembre,
            ],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 0,
            distributed: true
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
        },
        yaxis: {
          title: {
            text: "Ganancia Total",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val + "";
            },
          },
        },
      };

      this.chartOptionsTortaHorario = {
        series: [totalTarde, totalNoche, totalAnochecer],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: ["Tarde", "Noche", "Anochecer"],
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

  obtenerEstadisticaPorDiaPedido() {
    this.pedido.mostrarPedido().subscribe(result => {
      const pedidos = result;
      let totalLunes = 0;
      let totalMartes = 0;
      let totalMiercoles = 0;
      let totalJueves = 0;
      let totalViernes = 0;
      let totalSabado = 0;
      let totalDomingo = 0;
  
      for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];
  
        if (pedido) {
          let partesFecha = pedido.fechaPedido.split("/");
          let dia = parseInt(partesFecha[0]);
          let mes = parseInt(partesFecha[1]);
          let anio = parseInt(partesFecha[2]);
          let fecha = new Date(anio, mes - 1, dia); 
          let diaSemana = fecha.toLocaleString("en-US", { weekday: "short" });
  
          switch (diaSemana) {
            case "Sun": // Domingo
              totalDomingo += pedido.totalPedido;
              break;
            case "Mon": // Lunes
              totalLunes += pedido.totalPedido;
              break;
            case "Tue": // Martes
              totalMartes += pedido.totalPedido;
              break;
            case "Wed": // Miércoles
              totalMiercoles += pedido.totalPedido;
              break;
            case "Thu": // Jueves
              totalJueves += pedido.totalPedido;
              break;
            case "Fri": // Viernes
              totalViernes += pedido.totalPedido;
              break;
            case "Sat": // Sábado
              totalSabado += pedido.totalPedido;
              break;
            default:
              break;
          }
        }
      }
  
      this.chartOptionsPorDiaPedido = {
        series: [
          {
            name: "Ganancia por Día de la Semana",
            data: [totalDomingo, totalLunes, totalMartes, totalMiercoles, totalJueves, totalViernes, totalSabado],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 0,
            distributed: true
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        },
        yaxis: {
          title: {
            text: "Ganancia Total",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val + "";
            },
          },
        },
      };
    });
  }
  
  
  

}
