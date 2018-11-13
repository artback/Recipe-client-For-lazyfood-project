import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {
  readonly baseUrl = this.globals.SERVERURL;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor (private httpClient: HttpClient, private globals: Globals, private cookieService: CookieService) {
  }
  getObservable(url): Observable<any> {
    return this.httpClient.get(url, Globals.authHeader(this.cookieService));
  }
  getUserData(): Observable<any> {
   const url = this.baseUrl + '/users/info/';
   return this.getObservable(url);
  }
  createUser(user): Observable<any> {
    const url = this.baseUrl + '/users/register';
    const data = {
      username: user.username,
      forename: user.forename,
      surname: user.surname,
      password: user.password
    };
    return this.httpClient.post(url, data, Globals.authHeader(this.cookieService));
  }

  editUser(user): Observable<any> {
    const url = this.baseUrl + '/users/info';
    return this.httpClient.post(url, user, Globals.authHeader(this.cookieService));
  }
  logIn(user): Observable<any> {
    const url = this.baseUrl + '/oauth/token';
    const data = JSON.stringify({
      'grant_type': 'password',
      'username': user.username,
      'password': user.password,
      'client_id': 'mOHeCT4JNVSszc7071uoGzIgdbBuYocIGYxtw4XfKjs=',
      'client_secret': 'EUoAHrX4v9FxHzhBu4kJ5YhyBkpU5f1PZguQETSxl5hGwM9Lg1mRjWqn97YB92OFYUnC6OlN+DZEZo1aR5IA=='
    });

    return this.httpClient.post(url, data, this.options);

  }

}
