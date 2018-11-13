import {Component, OnInit, ViewChildren} from '@angular/core';
import {RecipeService} from '../../Services/recipe.service';
import {Globals} from '../../Injectable/globals';
import {Router} from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addRecipe.html',
  styleUrls: ['./addRecipe.css']
})

export class AddrecipeComponent implements OnInit {
  @ViewChildren('instructionfield') instructionsInput;
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

  constructor(public recipeService: RecipeService, public globals: Globals, public router: Router, private fb: FormBuilder) {}
  ngOnInit() {
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
  addRecipe(): void {
    // tslint:disable-next-line
    let recipe = this.recipeForm.value;
    recipe.hashtags = [];
    // tslint:disable-next-line
    let re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
    while (match = re.exec(recipe.description)) {
      recipe.hashtags.push(match[1]);
    }
    recipe.description = recipe.description.replace(/#(\w+)/g, '');
    recipe.img = this.img;
    recipe.author = 'cookie';
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
