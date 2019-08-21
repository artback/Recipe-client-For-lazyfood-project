import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter,  switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';
import {APIService, BatchGetRatingsQuery, BatchGetRecipesQuery, BatchGetRecipesWithRatingQuery} from '../../../API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  recipes: BatchGetRecipesQuery[];
  ratings: BatchGetRatingsQuery[];
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
      this.apiService.BatchGetRatings(
        (recipes as unknown as BatchGetRecipesQuery[]).map(recipe => recipe.uri)
      ).then(ratings => {
        this.ratings = (ratings as unknown as BatchGetRatingsQuery[]);
        this.recipes = (recipes as unknown as BatchGetRecipesQuery[]);
      });
    });
  }
  onRatingChange(event: {rating: number, uri: string}) {
    this.apiService.UpdateRating(event.rating, event.uri);
  }
}
