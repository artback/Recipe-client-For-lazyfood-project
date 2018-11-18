import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs';
@Injectable()
export class RatingService{
  constructor (private httpClient: HttpClient) {}

  updateRating(rating, id) {
    return this.httpClient.put(`${Globals.SERVERURL}/ratings/${id}`, {'value': rating});
  }
  getRating(id): Observable<any> {
    return this.httpClient.get(`${Globals.SERVERURL}/ratings/${id}`);
  }

}
