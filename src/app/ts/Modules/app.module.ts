import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {
  ModalComponent,
  HomeComponent,
  RecipeComponent,
  AppComponent,
  HeaderComponent,
  HamburgerComponent,
  HamburgerMenuComponent,
  RecipeListItemComponent,
  WeeklistComponent
} from '../Components';
import {RecipeService, UserService, WeekListService, RatingService} from '../Services';
import { FormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import * as moment from 'moment/moment';
import { CookieService } from 'ngx-cookie-service';
import { AlifeRatingStarModule } from 'alife-rating-star';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    RecipeComponent, HomeComponent,
    ModalComponent,
    RecipeListItemComponent, WeeklistComponent,
    AppComponent, HeaderComponent,
    HamburgerComponent, HamburgerMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    FlexLayoutModule,
    AlifeRatingStarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot()
  ],
  providers: [
   HttpClientModule, RecipeService, CookieService, WeekListService, RatingService, UserService, AmplifyService
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
