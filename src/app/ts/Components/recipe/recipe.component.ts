import { Component} from '@angular/core';
import {RecipeService} from '../../Services';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.html',
  styleUrls: ['./recipe.css'],
})

export class RecipeComponent {
  constructor(public recipeService: RecipeService) {
  }
 getIngredients(): void {
  }
}
