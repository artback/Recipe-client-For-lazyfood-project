import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {
  ModalComponent,
  HomeComponent,
  RecipeComponent,
  AppComponent,
  EditProfileComponent,
  HeaderComponent,
  HamburgerComponent,
  HamburgerMenuComponent,
  RecipeListItemComponent,
  WeeklistComponent
} from '../Components';
import {LoginService, RecipeService, UserService, WeekListService, RatingService} from '../Services';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    RecipeComponent, HomeComponent,
    ModalComponent, EditProfileComponent,
    RecipeListItemComponent, WeeklistComponent,
    AppComponent, HeaderComponent,
    HamburgerComponent, HamburgerMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AmplifyAngularModule,
    FormsModule,
    routing,
    FlexLayoutModule,
    AlifeRatingStarModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot()
  ],
  providers: [
   HttpClientModule, RecipeService, CookieService, LoginService, WeekListService, RatingService, UserService, AmplifyService,
    { provide: HTTP_INTERCEPTORS, useClass: BearerHttpInterceptor, multi: true },
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
