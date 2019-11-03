import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements  OnChanges {
  @Input() recipe: any;
  @Input() rating: any;
  @Output() ratingChange = new EventEmitter<{rating: number, uri: string}>();
  options = {
  maxRating: 5,
  readOnly: false,
  resetAllowed: false
  };
  ngOnChanges() {
    // Looks bad but works
    this.rating  = this.rating !== null ? this.rating : {__typename: 'rating', value: 0, updated: '20191115'};
  }


  onRatingChange(event) {
      this.ratingChange.emit({rating: event.newRating, uri: this.recipe.uri.substr(this.recipe.uri.lastIndexOf('_') + 1)});
  }

}
