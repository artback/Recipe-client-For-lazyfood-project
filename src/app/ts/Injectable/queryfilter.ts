import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Globals} from './globals';
import {RecipeService} from '../Services/recipe.service';

@Pipe({
  name: 'matchesSearch'
})
@Injectable()
export class Queryfilter implements PipeTransform {
    constructor(private recipeService: RecipeService) {}
    transform( searchText: string): void {
  }
}
