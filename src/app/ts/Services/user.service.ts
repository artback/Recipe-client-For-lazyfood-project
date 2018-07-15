import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/index';
@Injectable()
export class UserService {
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }
  getObservable(url): Observable<any> {
    return this.httpClient.get(url);
  }
  public createUser = (username, password) => {
    const data = {
      username: username,
      password: password
    };
    const url = this.globals.baseUrl + '/user';
    this.httpClient.post(url, data).subscribe(() => {
      console.log('User added');
      this.logIn(username, password);
    }, () => {
      console.log('User with ' + username + ' already exist,Logging in!');
      this.logIn(username, password);
    });
  }

  logIn = (username, password) => {
    const url = this.globals.baseUrl + '/login';
    const auth = 'Basic ' + window.btoa(username + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.post(url, null, options).subscribe((user) => {
      this.globals.isLoggedIn = true;
      this.globals.user = JSON.parse(user);
      this.globals.pass = password;
      Cookie.set('username', username);
      Cookie.set('password', password);
    }, function () {
      alert('Sorry, wrong password. Try again');
    });
  }

}
