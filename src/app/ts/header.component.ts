import { Component } from '@angular/core';
import {RecipeService} from './recipe.service';
import {Globals} from './globals';
@Component({
  selector: 'app-header',
  templateUrl: '../template/header.html',
  styleUrls: ['../css/header.css']
})

export class HeaderComponent {
  private name: String ;
  private password: String;
  private isLoggedIn: boolean;
  private isHome: boolean;
  constructor(public recipeService: RecipeService, private globals: Globals) {
  this.isHome = globals.isHome;
  this.isLoggedIn = globals.isLoggedIn;
  }
  logout(): void {
    this.globals.isLoggedIn = false;
    this.globals.user = '';
    this.globals.isHome = false;
    this.globals.pass = '';
  }
  createUser(): void {
    this.recipeService.createUser(this.name, this.password);
  }

}
