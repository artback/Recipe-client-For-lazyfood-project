import { Component } from '@angular/core';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: '../template/app.html',
  styleUrls: ['../css/app.css']
})

export class AppComponent {
  title = 'lazy client';
  constructor(public recipeService: RecipeService) {

  }
}
