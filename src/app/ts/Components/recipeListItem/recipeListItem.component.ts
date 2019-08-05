import {Component, Input, OnInit} from '@angular/core';
import {APIService} from '../../../API.service';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements OnInit {
  @Input() recipe;
  @Input() rating;
  options = {
  maxRating: 5,
  readOnly: false,
  resetAllowed: false
  };
  private id: string;
  ngOnInit() {
    this.id =  this.recipe.uri.substr(this.recipe.uri.lastIndexOf('_') + 1);
  }

  constructor(
    private apiService: APIService
  ) {}


  onRatingChange(event) {
    this.apiService.UpdateRating(event.newRating, this.id);
  }

}
