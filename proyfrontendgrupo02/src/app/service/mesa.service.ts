import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  urlBase:string="https://proygrupo02.onrender.com/api/mesa/"
  //urlBase:string="http://localhost:3000/api/mesa/"

  constructor(private _http: HttpClient) { }

  
  obtenerMesas():Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }
  
    return this._http.get(this.urlBase,httpOptions);
  }

  
  crearMesa(mesa: Mesa):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params : new HttpParams()

    }
    let body = JSON.stringify(mesa)
    return this._http.post(this.urlBase,body,httpOptions);
  }

  editarMesa(mesa:Mesa):Observable<any>{
      let httpOptions ={
        headers : new HttpHeaders ({
          "Content-Type": "application/json"
        }),
      params : new HttpParams()
      }
      let body = JSON.stringify(mesa);
      return this._http.put(this.urlBase + mesa._id,body,httpOptions);
    }


    obtenerMesa(id : string):Observable<any>{
      let httpOptions ={
        headers : new HttpHeaders ({
  
        }),
      params : new HttpParams()
      }
      
      return this._http.get(this.urlBase + id,httpOptions);
    }

    borrarMesa(id : string):Observable<any>{
      let httpOptions ={
        headers : new HttpHeaders ({
  
        }),
      params : new HttpParams()
      }
      
      return this._http.delete(this.urlBase + id,httpOptions);
    }


    obtenerMesasDisponibles():Observable<any>{
      const httpOptions={
        headers : new HttpHeaders({
  
        }),
        params : new HttpParams()
      }
    
      return this._http.get(this.urlBase + "disponible",httpOptions);
    }

    obtenerMesasNoDisponibles():Observable<any>{
      const httpOptions={
        headers : new HttpHeaders({
  
        }),
        params : new HttpParams()
      }
    
      return this._http.get(this.urlBase + "noDisponible",httpOptions);
    }
  }



