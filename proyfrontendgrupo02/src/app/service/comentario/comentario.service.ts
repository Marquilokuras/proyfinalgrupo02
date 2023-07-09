import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/models/comentario/comentario';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  //url="https://proygrupo02.onrender.com/api/comentario/";
  url="http://localhost:3000/api/comentario/";

  constructor(private _http : HttpClient) { }

  public obtenerComentarios():Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }

    return this._http.get(this.url,httpOptions);
  }


  public obtenerComentario(id:string):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }

    return this._http.get(this.url+id,httpOptions);
  }

  public altaComentario(comentario:Comentario):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }

    let body = JSON.stringify(comentario);

    return this._http.post(this.url,body,httpOptions);
  }

  public modificarComentario(comentario:Comentario):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({
        "Content-type":"application/json"
      }),
      params : new HttpParams()
    }

    let body = JSON.stringify(comentario);

    return this._http.put(this.url+comentario._id,body,httpOptions);
  }

  public eliminarComentario(id:string):Observable<any>{
    const httpOptions={
      headers : new HttpHeaders({

      }),
      params : new HttpParams()
    }

    return this._http.delete(this.url+id,httpOptions);
  }


}
