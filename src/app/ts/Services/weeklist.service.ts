import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable()
export class WeekListService {
 constructor (private httpClient: HttpClient) {}

getRandomWeek(week, year): Observable<any> {
  return this.httpClient.get(`${environment.api}/menu/${year}/${week}`);
}

saveWeekList(week, year, weekRecipes: any): Observable<any> {
    return this.httpClient.put(`${environment.api}/menu/${year}/${week}`, weekRecipes);
}
}
