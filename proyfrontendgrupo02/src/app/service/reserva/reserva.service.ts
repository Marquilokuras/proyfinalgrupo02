import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/models/reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

   urlBase: string = "proygrupo02.onrender.com/api/reserva/"
  //urlBase: string = "http://localhost:3000/api/reserva/"

  constructor(private _http: HttpClient) { }

  obtenerReservas(usuario: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams().append("usuario", usuario)
    }
    return this._http.get(this.urlBase, httpOptions);
  }

  obtenerTodasLasReservas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "todas", httpOptions);
  }

  obtenerPorNumeroDeMesa(numero: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams().append("numeroMesa", numero)
    }
    return this._http.get(this.urlBase + "mesa", httpOptions);
  }

  crearReserva(reserva: Reserva): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams()
    }
    let body = JSON.stringify(reserva)
    return this._http.post(this.urlBase, body, httpOptions);
  }

  editarReserva(reserva: Reserva): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams()
    }
    let body = JSON.stringify(reserva);
    return this._http.put(this.urlBase + reserva._id, body, httpOptions);
  }

  obtenerReserva(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + id, httpOptions);
  }

  borrarReserva(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams()
    }
    return this._http.delete(this.urlBase + id, httpOptions);
  }

}
