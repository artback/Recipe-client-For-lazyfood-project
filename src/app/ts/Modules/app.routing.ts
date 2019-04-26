import {WeeklistComponent, RecipeComponent, HomeComponent, ProfileComponent} from '../Components';
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
  { path: 'menu',    redirectTo: `menu/${getYear()}/${getWeekNumber()}`},
  { path: '**', component: HomeComponent},
];
export const Routing = RouterModule.forRoot(appRoutes);
