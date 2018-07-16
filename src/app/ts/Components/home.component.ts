import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
import {Globals} from '../Injectable/globals';

@Component({
  selector: 'app-home',
  templateUrl: '../../template/home.html',
  styleUrls: ['../../css/home.css']
})

export class HomeComponent {
  private recipes;
  private author;
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
