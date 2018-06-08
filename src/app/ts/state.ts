import {HomeComponent} from './home.component';
import {RecipeComponent} from './recipe.component';
import {AddrecipeComponent} from './addrecipe.component';
import {RecipeService} from './recipe.service';
import {Transition} from '@uirouter/angular';
export const homeState = {
  name: 'home', url: '', component: HomeComponent
};
export const recipeState = {
  name: 'recipe',
  url: '/recipe/:id',
  component: RecipeComponent,
  resolve: [
    {
      token: 'recipe',
      deps: [Transition, RecipeService],
      resolveFn: (trans, recipe) => recipe.getViewRecipe(trans.param().id)
    }
  ]
};
export const addRecipeState = {
  name: 'addRecipe',
  url: '/addRecipe',
  component: AddrecipeComponent
}
