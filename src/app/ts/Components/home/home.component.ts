import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../Services';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  private recipes: Observable<any[]>;
  private search: FormControl;
  constructor(
    public recipeService: RecipeService) {}
  ngOnInit() {
    this.search = new FormControl();
    this.recipes = this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
      switchMap(this.recipeService.searchRecipes),
      tap(query => console.log(`About to make an API call with query: ${query}`)),
    );
  }
}
