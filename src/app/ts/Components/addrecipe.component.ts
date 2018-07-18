import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {RecipeService} from '../Services/recipe.service';
import {Globals} from '../Injectable/globals';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-addrecipe',
  templateUrl: '../../template/addRecipe.html',
  styleUrls: ['../../css/addRecipe.css']
})

export class AddrecipeComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private img;
  private readonly NAMELENGTH = 4;
  get ingredientForm() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get instructionForm() {
    return this.recipeForm.get('instructions') as FormArray;
  }
  get Name() {
    return this.recipeForm.get('name');
  }
  createForm() {
    this.recipeForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.NAMELENGTH)
      ]],
      rating: [''],
      description: [''],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([]),
    });
    this.addIngredient();
    this.addInstruction();
  }
  @ViewChildren('instructionfield') instructionsInput;

  constructor(public recipeService: RecipeService, public globals: Globals, public router: Router, private fb: FormBuilder) {}
  ngOnInit() {
   if (!this.globals.isLoggedIn) {
     console.log('not logged in');
     this.router.navigate(['']);
   }
   this.createForm();
  }
  onFileSelected(files) {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          this.img = e.target.result;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
    }
  }
  eventHandler(event, index) {
    if (event.code === 'Enter') {
      this.jumpToStep();
    }
    if (event.code === 'Delete') {
       this.deleteInstruction(index);
     }
  }
  jumpToStep() {
    this.addInstruction();
    this.instructionsInput.changes.subscribe(() => {
      this.instructionsInput.last.nativeElement.focus();
    });
  }
  ngOnDestroy() {
    this.globals.addrecipe = (false && this.globals.isLoggedIn);
  }
  addRecipe(): void {
    let recipe = this.recipeForm.value;
    recipe.hashtags = [];
    let re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];;
    while (match = re.exec(recipe.description)) {
      recipe.hashtags.push(match[1]);
    }
    recipe.description = recipe.description.replace(/#(\w+)/g, '');
    recipe.img = this.img;
    recipe.author = this.globals.user;
    this.recipeService.addRecipe(recipe).subscribe((response) => {
          alert( response + ' was added');
          this.router.navigate(['']);
        }, (error) => {
          alert(error);
        }
      );
  }
  addIngredient(): void {
      const ingredient = this.fb.group({
      volume: ['', [
        Validators.required
        ]],
        name: ['', [
          Validators.required,
        ]],
    });
    this.ingredientForm.push(ingredient);
  }
  addInstruction(): void {
    const instruction = this.fb.group({
      instruction: ['']
    });
    this.instructionForm.push(instruction);
  }
  deleteInstruction(i) {
    this.instructionForm.removeAt(i);
  }
  deleteIngredient(i) {
    if (this.ingredientForm.length > 1) {
      this.ingredientForm.removeAt(i);
    }
  }
}
