import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = "https://proygrupo02.onrender.com/api/pedido/";
    //this.hostBase = "http://localhost:3000/api/pedido/";
  }

  public generarPedido(bebidasPedido:Array<any>,email : string | null): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    }

    const body = {
      'bebidasPedido' : bebidasPedido,
      'emailUsuario': email
    };

    return this._http.post('http://localhost:3000/api/pedido/', body, httpOption);
  }

  public mostrarPedido(): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       /*  Authorization: 'Bearer ' + localStorage.getItem('token'), */
      })
    }
    return this._http.get(this.hostBase+'pedidos', httpOption);
  }

  public eliminarPedido(id : string): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    }

    const url = this.hostBase+id
    return this._http.delete(url, httpOption);
  }

  public modificarPedido(_id:string,arrayModificado:Array<any>): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    }

     const data = {
      'bebidasPedido' : arrayModificado
    };

    var url = this.hostBase+ _id
    return this._http.put(url, data, httpOption);
  }

}