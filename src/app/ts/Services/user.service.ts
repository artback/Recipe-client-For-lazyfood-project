import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {
  constructor (private httpClient: HttpClient) {
  }
  getUserData(): Observable<any> {
   return this.httpClient.get(`${environment.api}/users/info`);
  }
  createUser(user): Observable<any> {
    const myUser = {
      username: user.username,
      forename: user.forename,
      surname: user.surname,
      password: user.password
    };
    return this.httpClient.post(`${environment.api}/users/register`, myUser);
  }
  editUser(user): Observable<any> {
    return this.httpClient.post(`${environment.api}/users/info`, user);
  }

}
