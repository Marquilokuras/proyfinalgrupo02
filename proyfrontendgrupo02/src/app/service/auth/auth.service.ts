import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url="https://proygrupo02.onrender.com/api/usuario/auth/autenticacion";
 // url="http://localhost:3000/api/usuario/auth/autenticacion";

  isLoggedIn = false;

  constructor(private _http: HttpClient) { }

  public verificarId(): Observable<any> {

    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
/*         Authorization: 'Bearer ' + localStorage.getItem('token'),
 */      }),
    };
    
    return this._http.get(this.url, httpOption);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
