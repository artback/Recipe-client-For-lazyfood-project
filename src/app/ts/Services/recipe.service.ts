import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Injectable/globals';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class RecipeService {
  private readonly  edamamURL = 'https://api.edamam.com';
  private readonly searchEdmamURL = this.edamamURL +  '/search?app_id=7bcc7b18&app_key=6bf94f4c82184663f1a9e0f5ee962982';
  constructor (private httpClient: HttpClient) {
  }

  getRecipe(id): Observable<any> {
    const url = this.searchEdmamURL + '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id;
    return this.httpClient.get(url);
  }

  addRecipe(recipe): Observable<any> {
    const recipeString = JSON.stringify(recipe);
    const url = Globals.SERVERURL + '/recipe';
    return this.httpClient.post(url, recipeString);
  }
  getRecipesSuggestions(query): Observable<any[]> {
    const url = this.searchEdmamURL + '&q=' + query;
    return this.httpClient.get<any>(url).pipe(
      map(res => {
        return res.hits.map(item => {
          return item.recipe;
        });
      })
    );
  }

  getRecipes(recipeIds: any[]) {
    let url = this.searchEdmamURL ;
    recipeIds.map((id) => url += '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' + id);
    return this.httpClient.get(url);
  }

}
