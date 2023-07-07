import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  hostBase: string;
 
  constructor(private _http: HttpClient) {
    this.hostBase = "http://proygrupo02.onrender.com/api/pedido/";
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

    return this._http.post('http://proygrupo02.onrender.com/api/pedido/', body, httpOption);
  }

  public mostrarPedido(): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.get('http://proygrupo02.onrender.com/api/pedido/pedidos', httpOption);
  }

  public eliminarPedido(id : string): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = 'http://proygrupo02.onrender.com/api/pedido/'+id

    return this._http.delete(url, httpOption);
  }

  public modificarPedido(_id:string,arrayModificado:Array<any>): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

     const data = {
      'bebidasPedido' : arrayModificado
    };
 

    var url = 'http://proygrupo02.onrender.com/api/pedido/' + _id

    return this._http.put(url, data, httpOption);
  }

}

