import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
import {Cookie} from 'ng2-cookies';
@Injectable()
export class Globals {
  readonly SERVERURL = 'http://localhost:1337';
  readonly NAMELENGTH = 4;
  user: String;
  isLoggedIn = false;
  static authHeader(): object {
    const auth = 'Bearer ' + Cookie.get('access_token');
    return {
      headers: {Authorization: auth}
    };
  }
  getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }
  getYear(): number  {
    return moment().add(2, 'days').year();
  }
}
