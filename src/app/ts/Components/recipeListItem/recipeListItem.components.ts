import {Component, Input} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {RatingChangeEvent} from 'angular-star-rating';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent {
  @Input() recipe;
  constructor(public recipeService: RecipeService) {
  }
  onRatingChange = (event: RatingChangeEvent, recipe) => {
    const rating = event.rating;
    this.recipeService.updateRating(rating, recipe.id);
  }
  removeRecipe(): void {
    // set header to Id check in backend if the same as author remove
    this.recipeService.removeRecipe(recipe.id);
  }
}
