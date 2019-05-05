import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../Services';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';
import {APIService, BatchGetRatingsQuery, RatingQuery} from '../../../API.service';

@Component({
  selector: 'app-home',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class ProfileComponent implements  OnInit {
  recipes: any[];
  ratings: BatchGetRatingsQuery;
  private search: FormControl;
  worth: number;
  tags: string[] = ['Vegan'];
  constructor(
    public recipeService: RecipeService,
    private apiService: APIService
  ) {}
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
    ).subscribe(recipes => {
      const recipes_ids = recipes.map(recipe => recipe.uri.substr(recipe.uri.lastIndexOf('_') + 1));
      this.apiService.BatchGetRatings(recipes_ids).then(ratings  => {
        this.ratings = ratings;
        this.recipes = recipes;
      });
    });
  }

  inputSlide(value) {
    this.worth = value;
  }
}
