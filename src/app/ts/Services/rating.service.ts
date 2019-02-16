import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { Value} from '../Models';


@Injectable()
export class RatingService {
  constructor (private httpClient: HttpClient) {}

  updateRating(rating: number, id: string) {
    return this.httpClient.put(`${environment.api}/ratings/${id}`, {'value': rating});
  }
  getRating(id: string): Observable<Value> {
    return this.httpClient.get<Value>(`${environment.api}/ratings/${id}`);
  }

}
