import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';
import { PedidoService } from 'src/app/service/pedido/pedido.service';
import * as ExcelJS from 'exceljs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})

export class PedidoFormComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  pedidos = new Array();
  bebidaPedido = new Array()

  constructor(private pedidoService: PedidoService, public loginService: LoginService, private router: Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    },
      this.mostrarPedidos();
  }

  generarExcel() {
    const workbook = new ExcelJS.Workbook();
    const create = workbook.creator = ('Marcos Quinteros');
    const worksheet = workbook.addWorksheet('Registro de Pedidos')

    worksheet.addRow(['Nombre Bebida', 'Ingredientes Bebida', 'Precio por Bebida', 'Cantidad de Bebidas','Fecha de Pedido', 'Total Precio Pedido','Nombre Promocion'])

    for (const pedido of this.pedidos) {
      for (const bebida of pedido.bebidasPedido) {
        worksheet.addRow([
          bebida.bebida?.nombreBebida,
          bebida.bebida?.ingredientesBebida,
          bebida.precioDetalle,
          bebida.cantidadBebidas,
          pedido.fechaPedido,
          pedido.totalPedido,
          pedido.promocion
        ]);
      }
    }

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.href = url
      a.download = 'registroPedidos.xlsx';
      a.click();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  public mostrarPedidos() {
    this.pedidoService.mostrarPedido().subscribe(
      result => {
        this.pedidos = result;
        this.bebidaPedido = result.bebidasPedido
        this.dtTrigger.next(this.pedidos);
        console.log(this.pedidos)
      },
      error => { }
    )
  }

  public eliminarPedido(idPedido: string) {
    this.pedidoService.eliminarPedido(idPedido).subscribe(
      result => {
        this.pedidos = result;
        this.bebidaPedido = result.bebidasPedido
        this.toastrService.success(`Se ha eliminado`, '¡Pedido eliminado con éxito!', {
          closeButton: true,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => { }
    )
  }

  agregarPedido() {
    this.router.navigate(["pedido"])
  }

  modificarPedido(idPedido: string) {
    this.router.navigate(['pedido', idPedido],);
  }

}
