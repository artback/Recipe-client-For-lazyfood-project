import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, {Auth} from 'aws-amplify';
import { config } from './aws';

import { AppModule } from './app/ts/Modules/app.module';
import { environment } from './environments/environment';
const oauth = {
  // Domain name
  domain : 'lazyfood.auth.us-east-2.amazoncognito.com',

  // Authorized scopes
  scope : ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

  // Callback URL
  redirectSignIn : 'http://localhost:4200/',

  // Sign out URL
  redirectSignOut : 'http://localhost:4200/',

  // 'code' for Authorization code grant,
  // 'token' for Implicit grant
  responseType: 'code',

  // optional, for Cognito hosted ui specified options
  options: {
    // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
    AdvancedSecurityDataCollectionFlag : true
  }
};
Amplify.configure(config);
Auth.configure({oauth: oauth});
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
