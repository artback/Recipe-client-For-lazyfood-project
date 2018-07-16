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
  public createUser = (username, password) => {
    const user = {
      username: username,
      password: password,
      forname: '',
      surname: '',
      adress : {
        address: '',
        co: '',
        state: '',
        city: '',
        postalcode: '',
      }
    };
    const url = this.baseUrl + '/user';
    this.httpClient.post(url, user).subscribe(() => {
      console.log('User added');
      this.logIn(username, password);
    }, () => {
      console.log('User with ' + username + ' already exist,Logging in!');
      this.logIn(username, password);
    });
  }
  public editUser = (user) => {
  const url = this.baseUrl + '/user/edit';
  this.httpClient.post(url, user).subscribe(() => {
   console.log('you was edited');
  });
  }
  public logout = () => {
  this.globals.isLoggedIn = false;
  this.globals.user = '';
  this.globals.pass = '';
  Cookie.set('username', '');
  Cookie.set('password', '');
  this.router.navigate(['']);
  }
  logIn = (username, password) => {
    const url = this.baseUrl + '/login';
    const auth = 'Basic ' + window.btoa(username + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.post(url, null, options).subscribe(() => {
      this.globals.isLoggedIn = true;
      this.globals.user = username;
      this.globals.pass = password;
      Cookie.set('username', username);
      Cookie.set('password', password);
    }, function () {
      alert('Sorry, wrong password. Try again');
    });
  }

}
