import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Globals} from './globals';
import {Recipe} from './models/Recipe';
@Component({
  selector: 'app-addrecipe',
  templateUrl: '../template/addRecipe.html',
  styleUrls: ['../css/addRecipe.css']
})

export class AddrecipeComponent implements OnInit, OnDestroy {
  private recipe = new Recipe();
  @ViewChildren('instructionfield') instructionsInput;
  constructor(public recipeService: RecipeService, public globals: Globals) {
    this.getIngredients();
  }
  ngOnInit() {
   this.globals.isHome = false;
   this.globals.addrecipe = (true && this.globals.isLoggedIn);
  }
  onFileSelected(files) {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          // Render thumbnail.
          this.recipe.img = e.target.result;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
    }
  }
  eventHandler(event, index, elmnt) {
    if (event.code === 'Enter') {
      if (index === this.recipe.instructions.length - 1) {
      this.addInstruction(index);
      }
    }
    if (event.code === 'Delete') {
       this.recipe.instructions.splice(index, 1);
     }
  }
  addInstruction() {
      this.recipe.addInstruction();
      this.jumpToStep();
  }
  jumpToStep() {
    this.instructionsInput.changes.subscribe(() => {
      this.instructionsInput.last.nativeElement.focus();
    });
  }
  ngOnDestroy() {
    this.globals.addrecipe = (false && this.globals.isLoggedIn);
  }
  addRecipe(): void {
    // this.recipeService.addRecipe(this.recipe);
  }
  getIngredients(): void {
    const promise = this.recipeService.getIngredients();
    promise.then(function (data) {
      this.recipe.ingredients = data.data;
    });
  }
}
