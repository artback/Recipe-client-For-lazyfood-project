import {Component, Input, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import {RatingService} from '../../Services';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements OnInit {
  @Input() recipe;
  id: String;
  value: number;
  options = {
  maxRating: 5,
  readOnly: false,
  resetAllowed: false
  };
  ngOnInit() {
    this.id =  this.recipe.uri.substr(this.recipe.uri.lastIndexOf('_') + 1);
    this.ratingService.getRating(this.id).subscribe((ret) => {this.value = ret.value || 1; }, () => {});
  }

  constructor(private ratingService: RatingService, public globals: Globals) {}


  onRatingChange(event) {
    this.ratingService.updateRating(event.newRating, this.id).subscribe();
  }

}
