import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
@Injectable()
export class Globals {
  readonly SERVERURL = 'http://localhost:1337';
  readonly NAMELENGTH = 4;
  static authHeader(Cookie): object {
    const auth = 'Bearer ' + Cookie.get('access_token');
    return {
      headers: {Authorization: auth}
    };
  }
  static getYear(): number  {
    return moment().add(2, 'days').year();
  }
  static getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }
}
