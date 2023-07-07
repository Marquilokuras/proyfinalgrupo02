import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bebida } from '../models/bebida';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {

  urlBase:string="https://proygrupo02.onrender.com/api/bebida/"

  constructor(private _http: HttpClient) { }

  public obtenerBebidas():Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }
  
    return this._http.get(this.urlBase,httpOptions);
  }


  public obtenerBebida(id:string):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }
  
    return this._http.get(this.urlBase+id,httpOptions);
  }

  public guardarBebida(bebida:Bebida):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }
    
    let body = JSON.stringify(bebida);

    return this._http.post(this.urlBase,body,httpOptions);
  }

  public actualizarBebida(bebida:Bebida):Observable<any>{
    console.log(bebida)
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }
    
    let body = JSON.stringify(bebida);

    return this._http.put(this.urlBase+bebida._id,body,httpOptions);
  }

  public eliminarBebida(bebida:Bebida):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
      
      }),
      params : new HttpParams()
    }

    return this._http.delete(this.urlBase+bebida._id,httpOptions);
  }
}
