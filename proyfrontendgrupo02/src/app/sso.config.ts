import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/login',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '407408718192.apps.googleusercontent.com',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: 'GOCSPX-09sOknvnB_NRAKmS2-H-??????????',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only', 

  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,

};