import { Component, HostListener} from '@angular/core';
import Amplify from 'aws-amplify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() { }
  isActive = false;

  redirectToLogin() {
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
  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

}
