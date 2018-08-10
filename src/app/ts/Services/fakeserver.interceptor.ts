import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import WeightedPicker from 'weighted-picker/browser';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs-compat/add/observable/of';
import * as moment from 'moment/moment';
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
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    const convertMS = ( milliseconds ) =>{
      // tslint:disable-next-line
      var day, hour, minute, seconds;
      seconds = Math.floor(milliseconds / 1000);
      minute = Math.floor(seconds / 60);
      seconds = seconds % 60;
      hour = Math.floor(minute / 60);
      minute = minute % 60;
      day = Math.floor(hour / 24);
      hour = hour % 24;
      return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
      };
    }
    const requestToUserAndPassword = (req) => {
      const auth = req.headers.get('Authorization');
      return FakeBackendInterceptor.getUsernameAndPasswordFromHeader(auth);
    };
    const requestToUserIndex = (req) => {
      const username = requestToUserAndPassword(req).username;
      return userSearch(username);
    };
    const userSearch = (username) => {
      for (let i = 0; users.length > i; i += 1) {
        if (users[i].username === username) {
          return i;
        }
      }

      return -1;
    };
    const splitURL =  (uri) => {
      uri = uri.split('/');
        // handle potential trailing slash
      return uri.filter(split => split.length > 1);
    };
    const findRating = (user, recipeId) => {
      if (user.rating) {
        for (let i = 0; i < user.rating.length; i++) {
          if (user.recipe[i] === recipeId) {
            return i;
          }
        }
      }
      return -1;
    };
    const getUniqueWeightedRandom = (items, ratings, date, quantity) => {
      const retValues = [];
      // tslint:disable-next-line
      let weights = [];
      for (let i = 0; i < ratings.length; i++) {
        date[i] == null ? date[i] = (Date.now() / 1.006) : date[i] = date[i];
        const day = convertMS(Date.now() - date[i]).day;
        weights.push(ratings[i] + day);
      }
      for (let i = 0; i < quantity; i++) {
        const picker = new WeightedPicker(items.length, index => weights[index]);
        const pickedIndex = picker.pickOne();
        retValues.push(items[pickedIndex]);
        delete items[pickedIndex];
        delete weights[pickedIndex];
      }
      return retValues;
    };
    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {
      // users
      if (request.url.endsWith('/login')  && request.method === 'POST') {
        // find if any user matches login credentials
        const userAndPassword = requestToUserAndPassword(request);
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
        newUser.recipe = [];
        newUser.menu = [];
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



      if (request.url.includes('/rating') && request.method === 'POST') {
          const body = JSON.parse(request.body);
          const userIndex = userSearch(body.user);
          const recipeId = splitURL(request.url).pop();
          const ratingIndex = findRating(users[userIndex], recipeId);
          if (ratingIndex === -1) {
            users[userIndex].rating.push(body.rating);
            users[userIndex].recipe.push(recipeId);
          } else {
            users[userIndex].rating[ratingIndex] = body.rating;
            users[userIndex].recipe[ratingIndex] = recipeId;
          }
          localStorage.setItem('users', JSON.stringify(users));
          return Observable.of(new HttpResponse({status: 200}));
      }
      if (request.url.includes('/rating') && request.method === 'GET') {
        const index = requestToUserIndex(request);
        const recipeId = splitURL(request.url).last;
        let rating = users[index].rating[recipeId];
        rating = (rating == null) ? {rating: 0}  : rating;
        return Observable.of(new HttpResponse({status: 200, body: rating}));
      }


      if (request.url.includes('/menu') && request.method === 'GET') {
        // Create an list of 7 dishes menu;
        const userIndex = requestToUserIndex(request);
        const weekListRecipes = getUniqueWeightedRandom(users[userIndex].recipe, users[userIndex].rating, users[userIndex].date , 7);
        return Observable.of(new HttpResponse({status: 200, body: weekListRecipes}));
      }
      if (request.url.includes('/menu') && request.method === 'POST') {
        const url = splitURL(request.url);
        const week = url.pop();
        const year = url.pop();
        const userIndex = requestToUserIndex(request);
        for (let i = 0; i < request.body.length; i++) {
          const recipeId = request.body[i].uri.split('#').pop();
          const ratingIndex = findRating(users[userIndex], recipeId);
          if (!users[userIndex].date) {
            users[userIndex].date = [];
          }
          users[userIndex].date[ratingIndex] = Date.now();
        }
        localStorage.setItem('users', JSON.stringify(users));
        if (users[userIndex].menu) {
          if (!users[userIndex].menu[year]) {
            users[userIndex].menu[year] = [];
          }
          if (!users[userIndex].menu[year][week]) {
            users[userIndex].menu[year][week] = [];
          }
          users[userIndex].menu[year][week].push(request.body);
        }
        return Observable.of(new HttpResponse({status: 200}));
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
