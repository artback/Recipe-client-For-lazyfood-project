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
  ProfileComponent, FriendsComponent
} from '../Components';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment/moment';
import { AlifeRatingStarModule } from 'alife-rating-star';
import { Routing } from './app.routing';
import {TagsInputModule} from '../Components/tags-input/tags-input.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    RecipeComponent, HomeComponent,
    RecipeListItemComponent, WeeklistComponent,
    AppComponent, HeaderComponent,
    HamburgerComponent, HamburgerMenuComponent,
    ProfileComponent, FriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TagsInputModule,
    FormsModule,
    Routing,
    AlifeRatingStarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GraphQLModule,
  ],
  providers: [
  HttpClientModule
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
