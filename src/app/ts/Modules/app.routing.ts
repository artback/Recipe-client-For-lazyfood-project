import {HomeComponent} from '../Components';
import {EditProfileComponent} from '../Components';
import {WeeklistComponent} from '../Components';
import {RecipeComponent} from '../Components';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'recipe/:id',    component: RecipeComponent},
  { path: 'menu/:year/:week',    component: WeeklistComponent},
  { path: 'profile', component: EditProfileComponent},
  { path: '**', component: HomeComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
