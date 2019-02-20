import {HomeComponent} from '../Components';
import {WeeklistComponent} from '../Components';
import {RecipeComponent} from '../Components';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  { path: 'recipe/:id',    component: RecipeComponent},
  { path: 'menu/:year/:week',    component: WeeklistComponent},
  { path: '**', component: HomeComponent},
];
export const Routing = RouterModule.forRoot(appRoutes);
