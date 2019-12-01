import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter,  switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements  OnInit {
  recipes: PreRecipe[];
  ratings: Rating[];
  private search: FormControl;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
      switchMap(query => this.http.get(`${environment.api}/recipes/${query}`))
    ).subscribe(recipes => {
      this.recipes = recipes as PreRecipe[];
      this.ratings = Array.apply(null, Array(this.recipes.length)).map(() => ({value: 0, updated: 0 }));
    });
  }
  onRatingChange(event: {rating: number, uri: string}) {
    console.log(event);
  }
}
