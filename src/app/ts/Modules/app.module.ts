import { BrowserModule } from '@angular/platform-browser';
import { Globals } from '../Injectable/globals';
import { NgModule} from '@angular/core';
import {
  ModalComponent,
  HomeComponent,
  HeaderComponent,
  RecipeComponent,
  AppComponent,
  EditProfileComponent,
  RecipeListItemComponent, WeeklistComponent
} from '../Components';
import {LoginService, RecipeService, UserService, WeekListService, RatingService} from '../Services';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import * as moment from 'moment/moment';
import {BearerHttpInterceptor} from '../Injectable/BearerHttpInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { AlifeRatingStarModule } from 'alife-rating-star';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    RecipeComponent,
    HomeComponent, HeaderComponent,
    ModalComponent, EditProfileComponent,
    RecipeListItemComponent, WeeklistComponent, AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    AlifeRatingStarModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot()
  ],
  providers: [
   HttpClientModule, RecipeService, Globals, UserService, CookieService, LoginService, WeekListService, RatingService,
    { provide: HTTP_INTERCEPTORS, useClass: BearerHttpInterceptor, multi: true },
  ],
  bootstrap: [
   AppComponent, HeaderComponent
  ]
})

export class AppModule {
  constructor(public globals: Globals) {
   moment.locale('sv');
  }

}
