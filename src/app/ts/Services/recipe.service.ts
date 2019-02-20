import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
const EDEMAMURL = 'https://api.edamam.com/search?app_id=7bcc7b18&app_key=6bf94f4c82184663f1a9e0f5ee962982';
@Injectable()
export class RecipeService {
  constructor (private httpClient: HttpClient) {}

  searchRecipes = (query: String): Observable<any[]> =>  {
    return this.httpClient.get<any[]>(EDEMAMURL + '&q=' + query );
  }

  getRecipes(recipeIds: any[]) {
    let url = EDEMAMURL;
    recipeIds.forEach((id) => url += '&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_' + id);
    return this.httpClient.get(url);
  }
}
