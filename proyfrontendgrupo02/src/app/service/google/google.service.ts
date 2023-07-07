import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: "http://localhost:4200/home",
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

  getToken(): string {
    return sessionStorage.getItem("googleToken")!;

  }
}
