import {Component, Input, OnInit} from '@angular/core';
import {APIService} from '../../../API.service';

@Component({
  selector: 'app-recipelistitem',
  templateUrl: './recipeListItem.html',
  styleUrls: ['./recipeListItem.css']
})

export class RecipeListItemComponent implements OnInit {
  @Input() recipe;
  value: number;
  options = {
  maxRating: 5,
  readOnly: false,
  resetAllowed: false
  };
  private id: string;
  ngOnInit() {
    this.id =  this.recipe.uri.substr(this.recipe.uri.lastIndexOf('_') + 1);
    this.apiService.Rating(this.id).then((data) =>{
      console.log(data.value);
      this.value = data.value;
    });
  }

  constructor(
    private apiService: APIService
  ) {}


  onRatingChange(event) {
    this.apiService.UpdateRating(this.id, event.newRating);
  }

}
