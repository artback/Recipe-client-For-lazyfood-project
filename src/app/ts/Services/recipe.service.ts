import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
@Injectable()
export class RecipeService {
  private readonly baseUrl = this.globals.SERVERURL;
  private readonly  edamamURL = 'https://api.edamam.com';
  private readonly searchEdmamURL = this.edamamURL +  '/search?app_id=7bcc7b18&app_key=6bf94f4c82184663f1a9e0f5ee962982';
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }
  private getObservable(url): Observable<any> {
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
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
    const url = this.searchEdmamURL + '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id;
    return this.getObservable(url);
  }

  getIngredient(id): Observable<any> {
    const url = this.baseUrl + '/ingredients/' + id;
    return this.getObservable(url);
  }
  updateRating(rating, recipeId) {
    recipeId = recipeId.split('#')[1];
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
    return this.httpClient.delete(url);
  }
  getRandomWeek(week, year): Observable<any[]> {
   const url = this.baseUrl + '/menu/' + year + '/' + week;
   return this.getObservable(url);
  }
  getRecipesSuggestions(query): Observable<any[]> {
    const url = this.searchEdmamURL + '&q=' + query;
    return this.getObservable(url).pipe(
      map(res => {
        return res.hits.map(item => {
          return item.recipe;
        });
      })
    );
  }

  getRating(id): Observable<any> {
    const url = this.baseUrl + '/rating/' + id;
    return this.getObservable(url);
  }

  getRecipes(recipeIds: any[]) {
    let url = this.searchEdmamURL ;
    recipeIds.map((id) => url += '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id);
    return this.getObservable(url);
  }
}
