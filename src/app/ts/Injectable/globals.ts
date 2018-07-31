import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
@Injectable()
export class Globals {
  readonly SERVERURL = 'http://localhost:8080';
  readonly NAMELENGTH = 4;
  user: String;
  pass: String;
  isLoggedIn = false;
  getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }
  getYear(): number  {
    return moment().add(2, 'days').year();
  }
}
