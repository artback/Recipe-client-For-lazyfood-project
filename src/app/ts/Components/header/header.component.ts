import {Component, HostListener, OnInit} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import Amplify from 'aws-amplify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
  isActive = false;
  user: any;
  userName: string;
  signedIn: boolean;

  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

  constructor(private amplifyService: AmplifyService) {}
  private redirectToLogin() {
    const config = Amplify.Auth.configure();
    const {
      domain,
      redirectSignIn,
      responseType
    } = config.oauth;
    const clientId = config.userPoolWebClientId;
    const cognitoURL =
      `https://${domain}/login?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
    document.location
      .assign(cognitoURL);
  }

  ngOnInit(): void {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state.match(/^(signedIn|signIn|cognitoHostedUI)$/) != null;
      console.log(authState);
      this.user = authState.user;
      this.userName =  `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    });
  }

  private logout() {
    this.amplifyService.auth().signOut();
  }
  private login() {
    this.redirectToLogin();
  }
}
