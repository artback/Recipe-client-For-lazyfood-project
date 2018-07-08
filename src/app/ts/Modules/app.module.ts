import { BrowserModule } from '@angular/platform-browser';
import { Globals } from '../Injectable/globals';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModalComponent} from '../Components/modal.component';
import { AppComponent } from '../Components/app.component';
import {HomeComponent} from '../Components/home.component';
import {HeaderComponent} from '../Components/header.component';
import {RecipeComponent} from '../Components/recipe.component';
import {AddrecipeComponent} from '../Components/addrecipe.component';
import {RecipeService} from '../Services/recipe.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Queryfilter} from '../Injectable/queryfilter';
import { HttpClientModule} from '@angular/common/http';
import {FakeBackendProvider} from '../Services/fakeserver.interceptor';
import {Cookie} from 'ng2-cookies';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'addRecipe', component: AddrecipeComponent},
  { path: 'recipe/:id',    component: RecipeComponent},
  { path: '**', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent, AddrecipeComponent, RecipeComponent, HomeComponent, HeaderComponent, Queryfilter, ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
    ),
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

