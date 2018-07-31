import { BrowserModule } from '@angular/platform-browser';
import { Globals } from '../Injectable/globals';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModalComponent} from '../Components/modal/modal.component';
import { AppComponent } from '../Components/app/app.component';
import {HomeComponent} from '../Components/home/home.component';
import {HeaderComponent} from '../Components/header/header.component';
import {RecipeComponent} from '../Components/recipe/recipe.component';
import {AddrecipeComponent} from '../Components/addrecipe/addrecipe.component';
import {RecipeService} from '../Services/recipe.service';
import {UserService} from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {FakeBackendProvider} from '../Services/fakeserver.interceptor';
import {Cookie} from 'ng2-cookies';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import {EditProfileComponent} from '../Components/editprofile/editProfile.component';
import { RecipeListItemComponent} from '../Components/recipeListItem/recipeListItem.components';
import {WeeklistComponent} from '../Components/WeekList/weeklist.component';
import { DragulaModule } from 'ng2-dragula';
import * as moment from 'moment/moment';
import {JsonpModule} from '@angular/http';
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'addrecipe', component: AddrecipeComponent},
  { path: 'recipe/:id',    component: RecipeComponent},
  { path: 'menu/:year/:week',    component: WeeklistComponent},
  { path: 'editprofile', component: EditProfileComponent},
  { path: '**', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent, AddrecipeComponent, RecipeComponent,
    HomeComponent, HeaderComponent,
    ModalComponent, EditProfileComponent,
    RecipeListItemComponent, WeeklistComponent
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
    BrowserAnimationsModule,
    JsonpModule,
    DragulaModule.forRoot()
  ],
  providers: [
   HttpClientModule, FakeBackendProvider, RecipeService, Globals, UserService
  ],
  bootstrap: [
   AppComponent, HeaderComponent
  ]
})
export class AppModule {
  constructor(public globals: Globals) {
   const username = Cookie.get('username');
   const password = Cookie.get('password');
   moment.locale('sv');
   if (username) {
     this.globals.isLoggedIn = true;
     this.globals.user = username;
   }
   if (password) {
    this.globals.pass = password;
   }
  }

}

