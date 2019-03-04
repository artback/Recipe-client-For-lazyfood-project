import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../Services';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  recipes: any[];
  private search: FormControl;
  constructor(
    public recipeService: RecipeService) {}
  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
      switchMap(this.recipeService.searchRecipes),
      // @ts-ignore
      map((recipes) => recipes.hits),
      map((recipe) => recipe.map(rec => rec.recipe)),
    ).subscribe(recipe => {
      this.recipes = recipe;
    });
  }
}
