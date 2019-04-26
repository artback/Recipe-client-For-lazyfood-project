import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment/moment';
import Amplify from 'aws-amplify';
import {AmplifyService} from 'aws-amplify-angular';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})

export class HamburgerMenuComponent implements  OnInit {
  @Input() isActive;
  signedIn = false;
  user: any;
  private usersName: string;
  constructor(private amplifyService: AmplifyService) {
  }
  private static redirectToLogin() {
    const config = Amplify.Auth.configure();
    const {
      domain,
      redirectSignIn,
      responseType
    } = config.oauth;
    const clientId = config.userPoolWebClientId;
    const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
    document.location.assign(url);
  }

  ngOnInit(): void {
    this.amplifyService.authStateChange$.subscribe((authState) => {
      this.signedIn = authState.state.match(/^(signedIn|signIn|cognitoHostedUI)$/) != null;
      this.user = authState.user;
      this.usersName =  `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    });
  }

  private logout() {
    this.amplifyService.auth().signOut();
  }
  private login() {
    HamburgerMenuComponent.redirectToLogin();
  }
}
