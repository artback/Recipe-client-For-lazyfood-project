import { Component } from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  title = 'lazy client';
  constructor(public recipeService: RecipeService) {
  }
}
