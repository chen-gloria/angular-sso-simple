import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso-app';

  constructor(private oauthService:OAuthService){
    this.configureSingleSignOn();
  }

  configureSingleSignOn(){
    // this.oauthService.initCodeFlow();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  // login(){
  //   this.oauthService.initImplicitFlow();
  // }

  // logout(){
  //   this.oauthService.logOut();
  // }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
