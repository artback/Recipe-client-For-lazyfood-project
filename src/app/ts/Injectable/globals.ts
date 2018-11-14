import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
@Injectable()
export class Globals {
  static readonly SERVERURL = 'http://localhost:1337';
  static readonly NAMELENGTH = 4;
  static getYear(): number  {
    return moment().add(2, 'days').year();
  }
  static getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }
}
