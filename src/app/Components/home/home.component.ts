import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter,  switchMap} from 'rxjs/internal/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements  OnInit {
  recipes: any[];
  ratings: any[];
  private search: FormControl;
  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges.pipe(
      debounceTime(400),
      filter(preventEmpty => preventEmpty),
      distinctUntilChanged(),
    ).subscribe(recipes => {
    });
  }
  onRatingChange(event: {rating: number, uri: string}) {
  }
}
