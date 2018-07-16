import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import {forEach} from '@angular/router/src/utils/collection';

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
    const recipes: any[] = JSON.parse(localStorage.getItem('recipes')) || [];
    const userSearch = function(username) {
      let i = null;
      for (i = 0; users.length > i; i += 1) {
        if (users[i].username === username) {
          return i;
        }
      }

      return -1;
    };
    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {
      // authenticate
      if (request.url.endsWith('/login')  && request.method === 'POST') {
        // find if any user matches login credentials
        const auth = request.headers.get('Authorization');
        const userAndPassword = FakeBackendInterceptor.getUsernameAndPasswordFromHeader(auth);
        const username = userAndPassword.username;
        const password = userAndPassword.password;
        const exists = users.filter(user => user.username === username && user.password === password).length;
        if (exists) {
            return Observable.of(new HttpResponse({status: 200, body: null}));
        } else {
            return Observable.throw('Unauthorised');
        }
      } else if (request.url.endsWith('/user') && request.method === 'POST') {
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
        return Observable.of(new HttpResponse({ status: 200 }));
      } else if (request.url.endsWith('/user/edit') && request.method === 'POST') {
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
      } else if (request.url.includes('/user/') && request.method === 'GET') {
        const username = request.url.split(/[\/]+/).pop();
        let myUser = users.filter(user => user.username === username)[0];
        if (myUser) {
         delete myUser.password;
         return Observable.of(new HttpResponse({ status: 200, body: myUser }));
        }
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
          return Observable.of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('unauthorised');
        }
      }

      if (request.url.match('/recipe') && request.method === 'POST') {
        const recipe = JSON.parse(request.body);
        const index = userSearch(recipe.author);
        if (users[index].ratings) {
          users[index].ratings.push({id: recipe.id, rating: recipe.rating});
        } else {
          users[index].ratings = [{id: recipe.id, rating: recipe.rating}];
        }
          recipes.push(JSON.stringify(recipe));
          localStorage.setItem('recipes', JSON.stringify(recipes));
          localStorage.setItem('users', JSON.stringify(users));
          return Observable.of(new HttpResponse({status: 200, body: recipe.name}));
      }
      if (request.url.match('/recipe') && request.method === 'GET') {
        let localRecipes = JSON.parse(localStorage.getItem('recipes'));
        if (localRecipes) {
          for (let i = 0; i < localRecipes.length; i++) {
            localRecipes[i] = JSON.parse(localRecipes[i]);
            localRecipes[i].id = i;
          }
          localRecipes = JSON.stringify(localRecipes);
          return Observable.of(new HttpResponse({status: 200, body: localRecipes}));
        } else {
          Observable.of(new HttpResponse({status: 200}));
        }
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
