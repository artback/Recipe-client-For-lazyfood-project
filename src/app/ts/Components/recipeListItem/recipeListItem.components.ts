import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {RatingChangeEvent} from 'angular-star-rating';
import {Globals} from '../../Injectable/globals';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements OnInit {
  @Input() recipe;
  id: String;
  value: number;
  ngOnInit() {
    this.id =  this.recipe.uri.substr(this.recipe.uri.lastIndexOf('_') + 1);
    this.recipeService.getRating(this.id).subscribe((ret) => {this.value = ret.value; });
  }

  constructor(public recipeService: RecipeService, public globals: Globals) {}


  onRatingChange(event: RatingChangeEvent) {
    this.recipeService.updateRating(event.rating, this.id).subscribe();
  }

}
