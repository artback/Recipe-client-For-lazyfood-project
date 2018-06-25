import { Component} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
@Component({
  selector: 'app-recipe',
  templateUrl: '../../template/recipe.html',
  styleUrls: ['../../css/recipe.css'],
  inputs: ['recipe'],
})

export class RecipeComponent {
  constructor(public recipeService: RecipeService) {
  }
 getIngredients(): void {
  }
}
