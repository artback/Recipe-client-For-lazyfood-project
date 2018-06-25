import {HomeComponent} from '../Components/home.component';
import {RecipeComponent} from '../Components/recipe.component';
import {AddrecipeComponent} from '../Components/addrecipe.component';
import {RecipeService} from '../Services/recipe.service';
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
};

