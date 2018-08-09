import {Component, Input} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {RatingChangeEvent} from 'angular-star-rating';
import {Globals} from '../../Injectable/globals';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent {
  @Input() recipe;
  rating: number;
  constructor(public recipeService: RecipeService, public globals: Globals) {
  }
  openRecipe() {
   const uri = this.recipe.uri;
   this.recipeService.getRecipe(uri).subscribe((recipe) => console.log(recipe));
  }
  onRatingChange(event: RatingChangeEvent, recipe) {
    this.recipeService.updateRating(event.rating, recipe.uri).subscribe();
  }
  removeRecipe(): void {
    // set header to Id check in backend if the same as author remove
    this.recipeService.removeRecipe(this.recipe.id);
  }
}
