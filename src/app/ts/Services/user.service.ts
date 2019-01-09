import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../Models';


@Injectable()
export class UserService {
  constructor (private httpClient: HttpClient) {
  }
  getUserData(): Observable<User> {
   return this.httpClient.get<User>(`${environment.api}/users/info`);
  }
  createUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${environment.api}/users/register`, user);
  }
  editUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${environment.api}/users/info`, user);
  }

}
