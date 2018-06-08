import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, materialize, dematerialize, mergeMap, _throw} from 'rxjs/operators';

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
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      // authenticate
      if (request.url.endsWith('/login')  && request.method === 'POST') {
        // find if any user matches login credentials
        const auth = request.headers.get('Authorization');
        const userAndPassword = FakeBackendInterceptor.getUsernameAndPasswordFromHeader(auth);
        const username = userAndPassword.username;
        const password = userAndPassword.password;
        const exists = users.filter(user => user.username === username && user.password === password).length;
        if (exists) {
            return of(new HttpResponse({status: 200, body: null}));
        } else {
            return Observable._throw('Unauthorised');
        }
      }
      // create user
      if (request.url.endsWith('/user') && request.method === 'POST') {
        // get new user object from post body
        const newUser = request.body;
        // validation
        const duplicateUser = users.filter(user => user.username === newUser.username).length;
        if (duplicateUser) {
          return Observable.throw('Username "' + newUser.username + '" is already taken');
        }
        // save new user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // delete user
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);
    })).materialize()
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
