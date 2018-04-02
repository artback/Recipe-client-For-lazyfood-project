import { Component } from '@angular/core';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-addrecipe',
  templateUrl: '../template/addRecipe.html',
  styleUrls: ['../css/addRecipe.css']
})

export class AddrecipeComponent {
  name: String;
  categoryID;
  private description: String;
  private instruction: String;
  private picture;
  private amount;
  private ingredient_id;
  ingredients;
  categories;
  constructor(public recipeService: RecipeService) {
    this.getCategories();
    this.getIngredients();
  }
  addrecipe(): void {
    this.recipeService.addRecipe(this.name, this.categoryID, this.description, this.instruction, this.picture);
  }
  getCategories(): void {
  const promise = this.recipeService.getCategories();
  promise.then(function (data) {
    this.categories = data.data;
  });
  }
  addIngredientToRecipe(): void {
      this.recipeService.addIngredientToRecipe(this.amount, this.ingredient_id);
  }
  getIngredients(): void {
  const promise = this.recipeService.getIngredients();
  promise.then(function (data) {
    this.ingredients = data.data;
  });
  }
}
