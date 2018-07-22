import {Component} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {Globals} from '../../Injectable/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {
  private recipes;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.getRecipes();
  }
  getRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((response) => {
      this.recipes = JSON.parse(response);
    });
  }
  removeRecipe(id): void {
    // set header to Id check in backend if the same as author remove
    this.recipeService.removeRecipe(id);
  }
}
