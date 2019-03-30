import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, {Auth} from 'aws-amplify';

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
Amplify.configure({
  'aws_appsync_graphqlEndpoint': 'https://retuqsjuyrb55g3mex5kin3ddu.appsync-api.us-east-2.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-2',
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
  Auth: {
    identityPoolId: 'us-east-2:ef3f6bcd-b291-4ff9-9198-0ee6e430f309',
    region: 'us-east-2',
    identityPoolRegion: 'us-east-2',
    userPoolId: 'us-east-2_6pGXvPblY',
    userPoolWebClientId: '1f7hepu7a71e8jkrq0et56le22',
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: oauth
  },
});
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
