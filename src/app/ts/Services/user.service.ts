import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/index';
@Injectable()
export class UserService {
  readonly baseUrl = this.globals.SERVERURL;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }
  getObservable(url): Observable<any> {
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
      headers: {Authorization: auth}
    };
    return this.httpClient.get(url, options);
  }
  getUserData(username): Observable<any> {
   const url = this.baseUrl + '/user/' + username;
   return this.getObservable(url);
  }
  createUser(user): Observable<any> {
    const url = this.baseUrl + '/users/register';
    const data = {
      username: user.username,
      password: user.password
    };
    return this.httpClient.post(url, data);
  }

  editUser(user): Observable<any> {
    const url = this.baseUrl + '/users/user';
    const data = {
      username: user.username,
      password: user.password
    };
    return this.httpClient.post(url, user);
  }
  logout(): void {
  this.globals.isLoggedIn = false;
  this.globals.user = '';
  this.globals.pass = '';
  Cookie.set('username', '');
  Cookie.set('password', '');
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
