import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import {FakeBackendInterceptor} from './fakeserver.interceptor';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  static getUsernameAndPasswordFromHeader(request: String) {
    let username, password;
    if (request != null && request.startsWith('Basic')) {
      let usernameAndPassword = request.replace('Basic', '');
      usernameAndPassword = window.atob(usernameAndPassword);
      const separator = usernameAndPassword.indexOf(':');
      username = usernameAndPassword.substring(0, separator);
      password = usernameAndPassword.substring(separator + 1);
    } else {
      throw new Error('The authorization header is either empty or isn\'t Basic.');
    }
    return {username: username, password: password};
  }
  static requestToUserAndPassword(request) {
    const auth = request.headers.get('Authorization');
    return FakeBackendInterceptor.getUsernameAndPasswordFromHeader(auth);
  }
  constructor() {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    const userSearch = (username) => {
      for (let i = 0; users.length > i; i += 1) {
        if (users[i].username === username) {
          return i;
        }
      }

      return -1;
    };
    const splitIdentifier =  (uri) => {
      uri = uri.split('/');
        // handle potential trailing slash
      return uri.pop() || uri.pop();
    };

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {
      // authenticate
      if (request.url.endsWith('/login')  && request.method === 'POST') {
        // find if any user matches login credentials
        const userAndPassword = FakeBackendInterceptor.requestToUserAndPassword(request);
        const username = userAndPassword.username;
        const password = userAndPassword.password;
        const exists = users.filter(user => user.username === username ).length;
        if (exists) {
            const authorised = users.filter(user => user.password === password).length;
            if (authorised) {
              return Observable.of(new HttpResponse({status: 200, body: null}));
            } else {
              return Observable.throw('wrong password');
            }
        } else {
            return Observable.throw('User don\'t exist');
        }
      }
      if (request.url.endsWith('/user') && request.method === 'POST') {
        // get new user object from post body
        const newUser = request.body;
        // validation
        const duplicateUser = users.filter(user => user.username === newUser.username).length;
        if (duplicateUser) {
          return Observable.throw('Username "' + newUser.username + '" is already taken');
        }
        // save new user
        newUser.rating = [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }
      if (request.url.endsWith('/user/edit') && request.method === 'POST') {
        // get new user object from post body
        const user = request.body;
        // validation
        const index = users.findIndex(oUser => oUser.username === user.username);
        if (index === -1) {
          return Observable.throw('Username "' + user.username + '" was not to found in the system');
        }
        // save user
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }
      if (request.url.includes('/user/') && request.method === 'GET') {
        const username = request.url.split(/[\/]+/).pop();
        const myUser = users.filter(user => user.username === username)[0];
        if (myUser) {
         delete myUser.password;
         return Observable.of(new HttpResponse({ status: 200, body: myUser }));
        }
      }
      if (request.url.includes('/rating/') && request.method === 'POST') {
          // const body = JSON.parse(request.body);
          //  const index = userSearch(body.user);
          // const recipeId = splitIdentifier(request.url);
          localStorage.setItem('users', JSON.stringify(users));
          return Observable.of(new HttpResponse({status: 200}));
      }
      if (request.url.includes('/rating') && request.method === 'GET') {
        const user = FakeBackendInterceptor.getUsernameAndPasswordFromHeader(request.headers.get('Authorization')).username;
        const index = userSearch(user);
        const recipeId = splitIdentifier(request.url);
        let rating = users[index].rating[recipeId];
        rating = (rating == null) ? {rating: 0}  : rating;
        return Observable.of(new HttpResponse({status: 200, body: rating}));
      }
      if (request.url.includes('/menu') && request.method === 'GET') {
        // Create an list of 7 dishes menu;
        // const username = FakeBackendInterceptor.requestToUserAndPassword(request).username;
        // const index = userSearch(username);
        return Observable.of(new HttpResponse({status: 200, body: null}));
      }
      // pass through any requests not handled above
      return next.handle(request);
    }).materialize()
      .delay(500)
      .dematerialize();
  }
}

export let FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
