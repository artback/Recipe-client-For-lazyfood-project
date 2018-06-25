import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
import {Globals} from '../models/globals';

@Component({
  selector: 'app-home',
  templateUrl: '../../template/home.html',
  styleUrls: ['../../css/home.css']
})

export class HomeComponent implements OnInit {
  private recipes;
  private author;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.getRecipes();
  }
  ngOnInit() {
   this.globals.isHome = true;
   this.globals.addrecipe = !this.globals.isLoggedIn;
  }
  getRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((recipes) => {
      console.log(recipes);
      this.recipes = JSON.parse(recipes);
    });
  }
  removeRecipe(id): void {
    // set header to Id check in backend if the same as author remove
    this.recipeService.removeRecipe(id);
  }
}
