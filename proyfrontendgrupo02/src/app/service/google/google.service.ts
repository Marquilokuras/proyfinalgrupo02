import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
   //redirectUri: "https://proygrupo02.onrender.com/home",
  redirectUri: "http://localhost:3000/home",
  clientId: '407408718192.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events'
}
@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private _http: HttpClient,
    private readonly oAuthService: OAuthService) {

    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        //oAuthService.loadUserProfile().then( (userProfile)=>{
        //console.log(JSON.stringify(userProfile))
        //})
        if (!oAuthService.hasValidAccessToken()) {
          console.log("tiene token INVALIDO")

          oAuthService.initLoginFlow()

        } else {
          console.log("tiene token VALIDO")
          sessionStorage.setItem("googleToken", oAuthService.getAccessToken());
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
          })
        }
      })
    })
  }

  configureGoogleService() {

  }

  getEvents(idCalendario: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.getToken(),
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
      //.append("key", "AIzaSyBVDwmGSiRaIoHqpsl9KfnmhfY8Vd34F6w")
    };

    console.log(httpOptions);
    return this._http.get("https://www.googleapis.com/calendar/v3/calendars/" + idCalendario + "@group.calendar.google.com/events", httpOptions);

  }

  createEvent(idCalendario: string, event: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.getToken(),
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
      //.append("key", "AIzaSyBVDwmGSiRaIoHqpsl9KfnmhfY8Vd34F6w")
    };

    let body = JSON.stringify(event);
    console.log(body);

    return this._http.post("https://www.googleapis.com/calendar/v3/calendars/" + idCalendario + "@group.calendar.google.com/events", body, httpOptions)
  }


  getToken(): string {
    return sessionStorage.getItem("googleToken")!;

  }


}
