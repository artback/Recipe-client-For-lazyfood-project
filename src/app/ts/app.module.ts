import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { NgModule} from '@angular/core';
import {UIRouterModule} from '@uirouter/angular';
import {ModalComponent} from './modal.component';
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
import { AutofocusDirective } from './autofocus.directive';
import {FakeBackendProvider} from './fakeserver.interceptor';
import {Cookie} from 'ng2-cookies';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent, AddrecipeComponent, RecipeComponent, HomeComponent, HeaderComponent, Queryfilter, ModalComponent, AutofocusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    UIRouterModule.forRoot({ states: [ homeState, recipeState, addRecipeState], useHash: true }),
    BrowserAnimationsModule
  ],
  providers: [
   HttpClientModule, FakeBackendProvider, RecipeService, Globals
  ],
  bootstrap: [
   AppComponent, HeaderComponent
  ]
})
export class AppModule {
  constructor(public globals: Globals) {
   const username = Cookie.get('username');
   const password = Cookie.get('password');
   if (username) {
     this.globals.isLoggedIn = true;
     this.globals.user = username;
   }
   if (password) {
    this.globals.pass = password;
   }
  }

}


