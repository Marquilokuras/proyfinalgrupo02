import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/usuario/";
  }

  // LOGIN

  public login(email: string, password: string): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const body = {
      email,
      password
    };

    return this._http.post('http://localhost:3000/api/usuario/login', body, httpOption);
  }

  //Se desloguea del sistema
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tipoUsuario");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("token");
  }

  //sessionStorage para ver cliente
  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  //Se obtiene el email de sesion
  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  //Se obtiene el id de sesion
  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  
  getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token")!;
    } else {
      return "";
    }
  }

  // FIN LOGIN

  // DAR DE ALTA USUARIO

  public altaUsuario(email: string, password: string, nombreUsuario: string, apellidoUsuario: string, dniUsuario: string, edadUsuario: number, tipoUsuario: string): Observable<any> {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const body = {
      'nombre' :  nombreUsuario,
      'apellido': apellidoUsuario,
      'email':email,
      'password' : password,
      'dniUsuario' : dniUsuario, 
      'edadUsuario' : edadUsuario, 
      'tipoUsuario' : tipoUsuario
    };

    return this._http.post('http://localhost:3000/api/usuario', body, httpOption);
  }

  public mostrarUsuario(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.get('http://localhost:3000/api/usuario/', httpOption);
  }

  public eliminarUsuario(_id :string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.delete('http://localhost:3000/api/usuario/'+_id, httpOption);
  }

  public modificarUsuario(_id :string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.put('http://localhost:3000/api/usuario/'+_id, httpOption);
  }

  public recuperarContrasena(email:string,dniUsuario:string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const url = `http://localhost:3000/api/usuario/recuperarContrasena?email=${email}&dniUsuario=${dniUsuario}`;
    console.log(url)
    return this._http.get(url, httpOption);
  }

}


