import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  hostBase: string;
 
  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/pedido/";
  }

  public generarPedido(bebidasPedido:Array<any>): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const body = {
      'bebidasPedido' : bebidasPedido
    };

    return this._http.post('http://localhost:3000/api/pedido/', body, httpOption);
  }

  public mostrarPedido(): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.get('http://localhost:3000/api/pedido/pedidos', httpOption);
  }

  public eliminarPedido(id : string): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://localhost:3000/api/pedido/'+id
    console.log(url)
    return this._http.delete(url, httpOption);
  }

}

