import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';
import { Promocion } from 'src/app/models/promocion/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  //urlBase:string="https://proygrupo02.onrender.com/api/promocion/"
  urlBase:string="http://localhost:3000/api/promocion/"

  constructor(private _http: HttpClient) { }

  public obtenerPromociones():Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }
  
    return this._http.get(this.urlBase,httpOptions);
  }

  public obtenerPromocion(id:string):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }
  
    return this._http.get(this.urlBase+id,httpOptions);                                                           

  }

  public guardarPromocion (promo:Promocion):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }
    let body = JSON.stringify(promo)

    return this._http.post(this.urlBase,body,httpOptions)
  }

  public actualizarPromocion(promo:Promocion):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }
    let body = JSON.stringify(promo)
    return this._http.put(this.urlBase+promo._id,body,httpOptions)
  }

  public eliminarPromocion(promo:Promocion):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
      
      }),
      params : new HttpParams()
    }

    return this._http.delete(this.urlBase+promo._id,httpOptions);
  }

  public agregarBebida(promo:Promocion,bebida:Bebida):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
      
      }),
      params : new HttpParams()
    }
    return this._http.get(this.urlBase+promo._id+"/bebida/"+bebida._id)
  }

  public eliminarBebida(promo:Promocion,bebida:Bebida):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
      
      }),
      params : new HttpParams()
    }
    return this._http.delete(this.urlBase+promo._id+"/bebida/"+bebida._id)
  }

}
