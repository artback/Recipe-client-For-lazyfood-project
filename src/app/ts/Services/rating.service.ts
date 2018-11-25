import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable()
export class RatingService {
  constructor (private httpClient: HttpClient) {}

  updateRating(rating, id) {
    return this.httpClient.put(`${environment.api}/ratings/${id}`, {'value': rating});
  }
  getRating(id): Observable<any> {
    return this.httpClient.get(`${environment.api}/ratings/${id}`);
  }

}
