import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/login',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
     clientId: '392598141594-7qk2nrrgdpohcu597a8qopd259k7qbkg.apps.googleusercontent.com',
   

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: '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',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',

  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,

};