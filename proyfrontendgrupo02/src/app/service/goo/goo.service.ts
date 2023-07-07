import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso.config';

@Injectable({
  providedIn: 'root'
})
export class GooService {

  constructor(private _http: HttpClient,
    private readonly oAuthService: OAuthService) { }

  configureSingleSignOne() {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }


  login() {
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.initCodeFlow();
  }


  logout() {
    this.oAuthService.logOut();

  }

  getToken(): string {
    return this.oAuthService.getAccessToken()
  }

}
