import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {CookieService} from 'ngx-cookie-service';
@Injectable()
export class RecipeService {
  private readonly baseUrl = this.globals.SERVERURL;
  private readonly  edamamURL = 'https://api.edamam.com';
  private readonly searchEdmamURL = this.edamamURL +  '/search?app_id=7bcc7b18&app_key=6bf94f4c82184663f1a9e0f5ee962982';
  constructor (private httpClient: HttpClient, private globals: Globals, private cookieService: CookieService) {
  }
  private getObservable(url): Observable<any> {
    return this.httpClient.get(url, Globals.authHeader(this.cookieService));
  }
  private postObservable(url , body): Observable<any> {
    return this.httpClient.post(url , body, Globals.authHeader(this.cookieService));
  }

  getRecipe(id): Observable<any> {
    const url = this.searchEdmamURL + '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id;
    return this.getObservable(url);
  }

  updateRating(rating, id) {
    const url = this.baseUrl + '/ratings/' + id;
    return this.httpClient.put(url, {'value': rating}, Globals.authHeader(this.cookieService));
  }
  addRecipe(recipe): Observable<any> {
    const recipeString = JSON.stringify(recipe);
    const url = this.baseUrl + '/recipe';
    return this.httpClient.post(url, recipeString, Globals.authHeader(this.cookieService));
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
    const url = this.baseUrl + '/ratings/' + id;
    return this.getObservable(url);
  }

  getRecipes(recipeIds: any[]) {
    let url = this.searchEdmamURL ;
    recipeIds.map((id) => url += '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id);
    return this.getObservable(url);
  }

  saveWeekList(week, year, weekRecipes: any): Observable<any> {
    const url = this.baseUrl + '/menu/' + year + '/' + week;
    return this.postObservable(url, weekRecipes);
  }
}
