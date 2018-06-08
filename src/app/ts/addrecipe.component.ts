import {AfterViewInit, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {RecipeService} from './recipe.service';
import {Globals} from './globals';
@Component({
  selector: 'app-addrecipe',
  templateUrl: '../template/addRecipe.html',
  styleUrls: ['../css/addRecipe.css']
})

export class AddrecipeComponent implements OnInit, OnDestroy {
  name: String;
  categoryID;
  private description: String;
  private instruction: String;
  private picture;
  private amount;
  private ingredient_id;
  ingredients;
  categories;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.getCategories();
    this.getIngredients();
  }
  ngOnInit() {
   this.globals.isHome = false;
   this.globals.addrecipe = (true && this.globals.isLoggedIn);
  }
  ngOnDestroy() {
    this.globals.addrecipe = (false && this.globals.isLoggedIn);
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
