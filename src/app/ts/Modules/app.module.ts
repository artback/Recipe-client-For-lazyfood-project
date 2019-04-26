import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {
  HomeComponent,
  RecipeComponent,
  AppComponent,
  HeaderComponent,
  HamburgerComponent,
  HamburgerMenuComponent,
  RecipeListItemComponent,
  WeeklistComponent,
  ProfileComponent
} from '../Components';
import {RecipeService, WeekListService} from '../Services';
import { FormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment/moment';
import { AlifeRatingStarModule } from 'alife-rating-star';
import { Routing } from './app.routing';

@NgModule({
  declarations: [
    RecipeComponent, HomeComponent,
    RecipeListItemComponent, WeeklistComponent,
    AppComponent, HeaderComponent,
    HamburgerComponent, HamburgerMenuComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Routing,
    AlifeRatingStarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
  RecipeService, WeekListService, AmplifyService, HttpClientModule
  ],
  bootstrap: [
   AppComponent
  ]
})

export class AppModule {
  constructor() {
   moment.locale('sv');
  }

}
