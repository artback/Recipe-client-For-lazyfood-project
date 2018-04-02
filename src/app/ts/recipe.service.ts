import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from './globals';
const baseUrl = 'http://localhost:8080';
@Injectable()
export class RecipeService {
  constructor (private httpClient: HttpClient, private globals: Globals) {}
  getPromise(url): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  getTable(): Promise<any> {
    const url = baseUrl + 'RecipeApp/webresources/viewRecipes';
    return this.getPromise(url);
  }

  getCategories(): Promise<any> {
    const url =  baseUrl + 'RecipeApp/webresources/categories';
    return this.getPromise(url);
  }

  getIngredients(): Promise<any> {
    const url = baseUrl + 'RecipeApp/webresources/ingredients';
    return this.getPromise(url);
  }

  getViewRecipe(id): Promise<any> {
    const url = baseUrl + 'RecipeApp/webresources/viewRecipe/' + id;
    return this.getPromise(url);
  }

  getRecipeIngredients(id): Promise<any> {
    const url = baseUrl + 'RecipeApp/webresources/ingredients/' + id;
    return this.getPromise(url);
  }

  createUser(name, password): void {
    const data = {
      name: name,
      password: password
    };
    const url = baseUrl + 'RecipeApp/webresources/createUser';
    this.httpClient.post(url, data).subscribe(function () {
      console.log('User added');
      alert('Welcome to ' + name);
    }, function () {
      console.log('User with this name already exist,Logging in!');
      this.loggIn(name, password);
    });
  }

  loggIn(name, password): void {
    const url = baseUrl + 'RecipeApp/webresources/login';
    const auth = 'Basic ' + window.btoa(name + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.post(url, null, options).subscribe(function () {
      console.log('you isLoggedIn!');
      this.globals.isLoggedIn = true;
      this.globals.user = name;
      this.globals.pass = password;
      console.log(name, password);
    }, function () {
      alert('Sorry, wrong password. Try again or create a new user');
      console.log('You cant login');
    });
  }

  addRecipe(name, categoryID, description, instruction, picture): void {
    const data = {
      name: name,
      categori_id: Number(categoryID),
      description: description,
      instruction: instruction,
      picture: picture
    };
    const url = baseUrl + 'RecipeApp/webresources/recipe';
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
     headers: {Authorization: auth}
    };
    this.httpClient.post(url, data, options).subscribe(function () {
      console.log('Recipe added');
      alert('Recipe added: ' + name);
    }, function () {
      console.log('Not able to add Recipe');
    });
  }
  removeRecipe(id): void {
    const url = 'http://localhost:8080/RecipeApp/webresources/recipe/' + id;
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.delete(url, options).subscribe(data =>
      console.log(data)
    );
  }

  addIngredientToRecipe(amount, ingredient_id): void {
    const data = {
      amount: amount,
      ingredient_id: Number(ingredient_id)
    };
    const url = baseUrl + 'RecipeApp/webresources/add/ingredientToRecipe';
    const auth = 'Basic ' + window.btoa(this.globals.user + ':' + this.globals.pass);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.post(url, data, options).subscribe(function () {
      console.log('Recipe added');
      alert('you have added: ' + amount + ingredient_id);
    }, function () {
      console.log('Not possible to add recipe');
    });
  }

}
