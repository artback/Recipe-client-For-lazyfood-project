import {Instruction} from './Instruction';
import {Ingredient} from './Ingredient';

export class Recipe {
  public img;
  public name: String;
  public ingredients: Ingredient[] = [];
  public description: String;
  public instructions: Instruction[] = [];
  constructor() {
    this.name = '';
    this.instructions.push(new Instruction());
    this.ingredients.push( new Ingredient('', 0));
  }
  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }
  addEmptyIngredient() {
    this.ingredients.push(new Ingredient('', 0));
  }
  addEmptyInstruction() {
    this.instructions.push(new Ingredient('', 0));
  }
  addInstruction(name, volume) {
    this.instructions.push(new Ingredient(name, volume));
  }
  removeIngredient(index) {
    if (this.ingredients.length !== 1 ) {
      this.ingredients.splice(index, 1);
    }
  }
}
