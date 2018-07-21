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
    return this.httpClient.get(url);
  }
  public getUserData = (username) => {
   const url = this.baseUrl + '/user/' + username;
   return this.getObservable(url);
  }
  public createUser = (user) => {
    const url = this.baseUrl + '/user';
    return this.httpClient.post(url, user);
  }

  public editUser = (user) => {
    const url = this.baseUrl + '/user/edit';
    return this.httpClient.post(url, user);
  }
  public logout = () => {
  this.globals.isLoggedIn = false;
  this.globals.user = '';
  this.globals.pass = '';
  Cookie.set('username', '');
  Cookie.set('password', '');
  }
  public logIn = (username, password) => {
    const url = this.baseUrl + '/login';
    const auth = 'Basic ' + window.btoa(username + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    return this.httpClient.post(url, null, options);
  }

}
