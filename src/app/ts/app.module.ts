import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { NgModule} from '@angular/core';
import {UIRouterModule} from '@uirouter/angular';
import { AppComponent } from './app.component';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header.component';
import {RecipeComponent} from './recipe.component';
import {AddrecipeComponent} from './addrecipe.component';
import {RecipeService} from './recipe.service';
import { FormsModule } from '@angular/forms';
import {homeState, addRecipeState, recipeState} from './state';
import {Queryfilter} from './queryfilter';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent, AddrecipeComponent, RecipeComponent, HomeComponent, HeaderComponent, Queryfilter
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UIRouterModule.forRoot({ states: [ homeState, recipeState, addRecipeState], useHash: true })
  ],
  providers: [
   RecipeService, HttpClientModule, Globals
  ],
  bootstrap: [
   AppComponent, HeaderComponent
  ]
})
export class AppModule { }


