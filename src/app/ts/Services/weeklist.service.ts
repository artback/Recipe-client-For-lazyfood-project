import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs';
@Injectable()
export class WeekListService {
 constructor (private httpClient: HttpClient) {}

getRandomWeek(week, year): Observable<any> {
  return this.httpClient.get(`${Globals.SERVERURL}/menu/${year}/${week}`);
}

saveWeekList(week, year, weekRecipes: any): Observable<any> {
return this.httpClient.post(`${Globals.SERVERURL}/${year}/${week}`, weekRecipes);
}
}
