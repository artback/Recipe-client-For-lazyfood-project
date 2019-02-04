import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify from 'aws-amplify';
import { config } from './aws';

import { AppModule } from './app/ts/Modules/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Amplify.configure(config);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
