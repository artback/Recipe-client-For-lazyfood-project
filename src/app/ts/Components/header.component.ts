import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
import {Globals} from '../models/globals';
import {Cookie} from 'ng2-cookies';
@Component({
  selector: 'app-header',
  templateUrl: '../../template/header.html',
  styleUrls: ['../../css/header.css']
})

export class HeaderComponent{
  private name: String;
  private password: String;
  constructor(public recipeService: RecipeService, public globals: Globals) {

  }
  logout(): void {
    this.globals.isLoggedIn = false;
    this.globals.user = '';
    this.globals.pass = '';
    Cookie.set('username', '');
    Cookie.set('password', '');
  }
  submit(modal): void {
   modal.hide();
   this.createUser();
  }
  createUser(): void {
    this.recipeService.createUser(this.name, this.password);
  }


}