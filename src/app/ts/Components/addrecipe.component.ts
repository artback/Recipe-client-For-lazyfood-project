import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
import {Globals} from '../Injectable/globals';
import {Recipe} from '../models/Recipe';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-addrecipe',
  templateUrl: '../../template/addRecipe.html',
  styleUrls: ['../../css/addRecipe.css']
})

export class AddrecipeComponent implements OnInit, OnDestroy {
  private recipe = new Recipe();
  private description: string;
  @ViewChildren('instructionfield') instructionsInput;
  constructor(public recipeService: RecipeService, public globals: Globals, public router: Router) {
    // this.getIngredients();
  }
  ngOnInit() {
   if (!this.globals.isLoggedIn) {
     console.log('not logged in');
     this.router.navigate(['']);
   }
   this.description = '';
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
      this.recipe.addEmptyInstruction();
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
    if (this.recipe.name !== '') {
      let re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
      while (match = re.exec(this.description)) {
        this.recipe.hashtags.push(match[1]);
      }
      this.recipe.description = this.description.replace(/#(\w+)/g, '');
      this.recipe.author = this.globals.user;
      this.recipeService.addRecipe(this.recipe).subscribe((response) => {
          alert('recipe:' + response + ' was added');
          this.router.navigate(['']);
        }, (error) => {
          alert(error);
        }
      );
    } else {
     alert('Name is missing');
    }
  }
  getIngredients(): void {
    this.recipeService.getIngredients().subscribe((data) => {
      this.recipe.ingredients = data.data;
    });
  }
}
