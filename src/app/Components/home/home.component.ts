import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter,  switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements  OnInit {
  recipes: any[];
  ratings: any[];
  private search: FormControl;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
      switchMap((query: String) => this.apollo.query(gql`query {
        recipes(query: ${query},begin: 0,end: 10){
            uri
            calories
            cautions
            image
        }
      }`).toPromise().then(data => data.data))
    ).subscribe(recipes => {
      this.recipes = recipes as any[];
    });
  }
  onRatingChange(event: {rating: number, uri: string}) {
  }
}
