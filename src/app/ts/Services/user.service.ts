import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor (private httpClient: HttpClient) {
  }
  getUserData(): Observable<any> {
   return this.httpClient.get(`${Globals.SERVERURL}/users/info`);
  }
  createUser(user): Observable<any> {
    const myUser = {
      username: user.username,
      forename: user.forename,
      surname: user.surname,
      password: user.password
    };
    return this.httpClient.post(`${Globals.SERVERURL}/users/register`, myUser);
  }
  editUser(user): Observable<any> {
    return this.httpClient.post(`${Globals.SERVERURL}/users/info`, user);
  }

}
