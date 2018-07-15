import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs/index';
const baseUrl = 'http://localhost:8080';
@Injectable()
export class RecipeService {
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }

  getObservable(url): Observable<any> {
    return this.httpClient.get(url);
  }
  getAllRecipes(): Observable<any> {
    const url = baseUrl + '/recipe';
    return this.getObservable(url);
  }

  getCategories(): Observable<any> {
    const url =  baseUrl + 'RecipeApp/webresources/categories';
    return this.getObservable(url);
  }

  getIngredients(): Observable<any> {
    const url = baseUrl + '/ingredients';
    return this.getObservable(url);
  }

  getRecipe(id): Observable<any> {
    const url = baseUrl + '/recipe/' + id;
    return this.getObservable(url);
  }

  getIngredient(id): Observable<any> {
    const url = baseUrl + '/ingredients/' + id;
    return this.getObservable(url);
  }

  addRecipe(recipe): Observable<any> {
    const recipeString = JSON.stringify(recipe);
    const url = baseUrl + '/recipe';
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
     headers: {Authorization: auth}
    };
    return this.httpClient.post(url, recipeString, options);
  }
  removeRecipe(id): void {
    const url = baseUrl + '/recipe/' + id;
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.delete(url, options).subscribe(data =>
      console.log(data)
    );
  }

}
