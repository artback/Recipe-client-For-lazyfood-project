import { BrowserModule } from '@angular/platform-browser';
import { Globals } from '../models/globals';
import { NgModule} from '@angular/core';
import {UIRouterModule} from '@uirouter/angular';
import {ModalComponent} from '../Components/modal.component';
import { AppComponent } from '../Components/app.component';
import {HomeComponent} from '../Components/home.component';
import {HeaderComponent} from '../Components/header.component';
import {RecipeComponent} from '../Components/recipe.component';
import {AddrecipeComponent} from '../Components/addrecipe.component';
import {RecipeService} from '../Services/recipe.service';
import { FormsModule } from '@angular/forms';
import {homeState, addRecipeState, recipeState} from '../models/state';
import {Queryfilter} from '../models/queryfilter';
import { HttpClientModule} from '@angular/common/http';
import { AutofocusDirective } from '../models/autofocus.directive';
import {FakeBackendProvider} from '../Services/fakeserver.interceptor';
import {Cookie} from 'ng2-cookies';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatTab} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent, AddrecipeComponent, RecipeComponent, HomeComponent, HeaderComponent, Queryfilter, ModalComponent, AutofocusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
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


