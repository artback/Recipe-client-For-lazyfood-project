import {WeeklistComponent, RecipeComponent, HomeComponent, ProfileComponent, FriendsComponent} from '../Components';
import {RouterModule, Routes} from '@angular/router';
import * as moment from 'moment/moment';


const getWeekNumber = () => {
  return moment().add(2, 'days').week();
};
const getYear = () => {
  return moment().add(2, 'days').year();
};
const appRoutes: Routes = [
  { path: 'recipe/:id',    component: RecipeComponent},
  { path: 'menu/:year/:week',    component: WeeklistComponent},
  { path: 'profile',    component:  ProfileComponent},
  { path: 'friends',    component:  FriendsComponent},
  { path: 'menu',    redirectTo: `menu/${getYear()}/${getWeekNumber()}`},
  { path: 'home', component: HomeComponent},
  { path: '**',    redirectTo: 'home'}
];
export const Routing = RouterModule.forRoot(appRoutes);
