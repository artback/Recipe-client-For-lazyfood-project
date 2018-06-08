import {AfterViewInit, Component, Injectable, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Globals} from './globals';

@Component({
  selector: 'app-home',
  templateUrl: '../template/home.html',
  styleUrls: ['../css/home.css']
})

export class HomeComponent implements OnInit {
  private author: String;
  table;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.getRecipes();
  }
  ngOnInit() {
   this.globals.isHome = true;
   this.globals.addrecipe = !this.globals.isLoggedIn;
  }
  getRecipes(): void {
    const promise = this.recipeService.getTable();
    promise.then(function (data) {
      this.table = data.data;
    });
  }
  removeRecipe(id): void {
    const promise = this.recipeService.getViewRecipe(id);
    promise.then(function (data) {
      this.author = data.data[0].author;
      if (this.recipeService.user === this.author) {
        this.recipeService.removeRecipe(id);
        alert('Your recipe was deleted succesfully');
      } else {
        alert('You are only allowed to delete your own recipes');
      }
    });
  }
}
