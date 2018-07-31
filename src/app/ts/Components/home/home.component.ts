///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {Globals} from '../../Injectable/globals';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import 'rxjs-compat/add/operator/map';
import {Observable} from 'rxjs/index';
import {debounceTime, switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  private recipes: Observable<any[]>;
  private search: FormControl;
  constructor(public recipeService: RecipeService, public globals: Globals) {
  }
  ngOnInit() {
    this.search = new FormControl();
    this.recipes = this.search.valueChanges.pipe(
      debounceTime(400),
      switchMap(term => this.recipeService.getRecipesSuggestions(term)),
    );
  }
}
