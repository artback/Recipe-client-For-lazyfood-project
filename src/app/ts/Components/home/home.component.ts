import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter,  switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';
import {APIService, BatchGetRatingsQuery, BatchGetRecipesQuery} from '../../../API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  recipes: BatchGetRecipesQuery;
  ratings: BatchGetRatingsQuery;
  private search: FormControl;
  constructor(
    private apiService: APIService
  ) {}
  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
      switchMap(this.apiService.BatchGetRecipes),
    ).subscribe(recipes => {
      //const recipes_ids = recipes.map(recipe => recipe.uri.substr(recipe.uri.lastIndexOf('_') + 1));
      this.recipes = recipes;
      // this.apiService.BatchGetRatings(recipes_ids).then(ratings  => {
      //   this.ratings = ratings;
      // });
    });
  }
}
