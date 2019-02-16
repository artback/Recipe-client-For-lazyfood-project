import {Component, HostListener, OnInit} from '@angular/core';
import Amplify from 'aws-amplify';
import {AmplifyService} from 'aws-amplify-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
  signedIn: boolean;
  isActive = false;
  constructor( private amplifyService: AmplifyService ) {
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

  private logout() {
    this.amplifyService.auth().signOut();
  }
  private buttonClicked(event) {
   if (event === 'login') {
    HeaderComponent.redirectToLogin();
   } else {
      this.logout();
   }
  }
  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {
    this.amplifyService.authStateChange$.subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
      });
  }
}
