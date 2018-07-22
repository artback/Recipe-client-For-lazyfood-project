import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs/index';
@Injectable()
export class RecipeService {
  readonly baseUrl = this.globals.SERVERURL;
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }
  getObservable(url): Observable<any> {
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.password);
    const options = {
      headers: {Authorization: auth}
    };
    return this.httpClient.get(url, options);
  }
  getAllRecipes(): Observable<any> {
    const url = this.baseUrl + '/recipe';
    return this.getObservable(url);
  }

  getCategories(): Observable<any> {
    const url =  this.baseUrl + 'RecipeApp/webresources/categories';
    return this.getObservable(url);
  }

  getIngredients(): Observable<any> {
    const url = this.baseUrl + '/ingredients';
    return this.getObservable(url);
  }

  getRecipe(id): Observable<any> {
    const url = this.baseUrl + '/recipe/' + id;
    return this.getObservable(url);
  }

  getIngredient(id): Observable<any> {
    const url = this.baseUrl + '/ingredients/' + id;
    return this.getObservable(url);
  }
  updateRating(rating, recipeId) {
    const url = this.baseUrl + '/rating/' + recipeId;
    const body = JSON.stringify({user: this.globals.user, rating: rating});
    return this.httpClient.post(url, body);
  }
  addRecipe(recipe): Observable<any> {
    const recipeString = JSON.stringify(recipe);
    const url = this.baseUrl + '/recipe';
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
     headers: {Authorization: auth}
    };
    return this.httpClient.post(url, recipeString, options);
  }
  removeRecipe(id): Observable<any> {
    const url = this.baseUrl + '/recipe/' + id;
    return this.httpClient.delete(url, options);
  }

  getRating(id): Observable<any> {
    const url = this.baseUrl + '/rating/' + id;
    return this.getObservable(url);
  }
}
