import { Component, Input } from '@angular/core';
import {RecipeService} from './recipe.service';
@Component({
  selector: 'app-recipe',
  templateUrl: '../template/recipe.html',
  styleUrls: ['../css/recipe.css'],
  inputs: ['recipe'],
})

export class RecipeComponent {
  recipe;
  table;
  constructor(public recipeService: RecipeService) {
    this.getIngredients();
  }
 getIngredients(): void {
  console.log(this.recipe.data);
  const promiseIng = this.recipeService.getRecipeIngredients(this.recipe.id);
  promiseIng.then(function (data) {
    console.log(data.data);
    this.table = data.data;
  });
}
}
