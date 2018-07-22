import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {RatingChangeEvent} from 'angular-star-rating';
import {Globals} from '../../Injectable/globals';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements  OnInit {
  @Input() recipe;
  rating: number;
  constructor(public recipeService: RecipeService, private globals: Globals) {
  }
  ngOnInit() {
    this.recipeService.getRating(this.recipe.id).subscribe((ratingResponse) => {
      this.rating = (ratingResponse.rating == null) ? 0 : ratingResponse.rating;
    });
  }
  onRatingChange = (event: RatingChangeEvent, recipe) => {
    this.recipeService.updateRating(event.rating, recipe.id).subscribe();
  }
  removeRecipe(): void {
    // set header to Id check in backend if the same as author remove
    this.recipeService.removeRecipe(recipe.id);
  }
}
