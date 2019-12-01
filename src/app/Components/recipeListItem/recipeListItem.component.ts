import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent {
  private _recipe: PreRecipe;
  @Input()
  set recipe(recipe: PreRecipe) {
    this._recipe = {...recipe};
    this._recipe.image = 'https://spoonacular.com/recipeImages/' + recipe.id + '-556x370.jpg';
    console.log(this._recipe);
  }
  get recipe(): PreRecipe {return this._recipe; }
  @Input() rating: Rating;
  @Output() ratingChange = new EventEmitter<{rating: number, id: string}>();
  options = {
  maxRating: 5,
  readOnly: false,
  resetAllowed: false
  };

  onRatingChange(event) {
      this.ratingChange.emit({rating: event.newRating, id: this._recipe.id});
  }

}
