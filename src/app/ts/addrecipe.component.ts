import { Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Globals} from './globals';
import {Ingredient} from './Ingredient';
import { Ingredient } from './Ingredient';
@Component({
  selector: 'app-addrecipe',
  templateUrl: '../template/addRecipe.html',
  styleUrls: ['../css/addRecipe.css']
})

export class AddrecipeComponent implements OnInit, OnDestroy {
  private name: String;
  private ingredients: Ingredient[] = new Array();
  private description: String;
  private instruction: String;
  private picture;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.ingredients.push(new Ingredient());
    this.getCategories();
    this.getIngredients();
  }
  ngOnInit() {
   this.globals.isHome = false;
   this.globals.addrecipe = (true && this.globals.isLoggedIn);
  }
  addIngredient() {
    this.ingredients.push(new Ingredient());
  }
  removeIngredient() {
    this.ingredients.pop();
  }
  ngOnDestroy() {
    this.globals.addrecipe = (false && this.globals.isLoggedIn);
  }
  addRecipe(): void {
    console.log(this.ingredients.size);
    //this.recipeService.addRecipe(this.name, this.categoryID, this.description, this.instruction, this.picture);
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
