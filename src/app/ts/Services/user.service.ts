import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/index';
@Injectable()
export class UserService {
  readonly baseUrl = this.globals.SERVERURL;
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
    const url = this.baseUrl + '/user';
    return this.httpClient.post(url, user);
  }

  editUser(user): Observable<any> {
    const url = this.baseUrl + '/user/edit';
    return this.httpClient.post(url, user);
  }
  logout(): Observable<any> {
  this.globals.isLoggedIn = false;
  this.globals.user = '';
  this.globals.pass = '';
  Cookie.set('username', '');
  Cookie.set('password', '');
  }
  logIn(username, password): Observable<any> {
    const url = this.baseUrl + '/login';
    const auth = 'Basic ' + window.btoa(username + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    return this.httpClient.post(url, null, options);
  }

}
