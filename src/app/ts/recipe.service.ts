import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from './globals';
import {Cookie} from 'ng2-cookies/ng2-cookies';
const baseUrl = 'http://localhost:8080';
@Injectable()
export class RecipeService {
  constructor (private httpClient: HttpClient, private globals: Globals) {
  }

  getPromise(url): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }
  getTable(): Promise<any> {
    const url = baseUrl + '/viewRecipes';
    return this.getPromise(url);
  }

  getCategories(): Promise<any> {
    const url =  baseUrl + 'RecipeApp/webresources/categories';
    return this.getPromise(url);
  }

  getIngredients(): Promise<any> {
    const url = baseUrl + '/ingredients';
    return this.getPromise(url);
  }

  getViewRecipe(id): Promise<any> {
    const url = baseUrl + '/viewRecipe/' + id;
    return this.getPromise(url);
  }

  getRecipeIngredients(id): Promise<any> {
    const url = baseUrl + '/ingredients/' + id;
    return this.getPromise(url);
  }

  public createUser = (username, password) => {
    const data = {
      username: username,
      password: password
    };
    const url = baseUrl + '/user';
    this.httpClient.post(url, data).subscribe(() => {
      console.log('User added');
      alert('Welcome ' + username);
      this.logIn(username, password);
    }, () => {
      console.log('User with ' + username + ' already exist,Logging in!');
      this.logIn(username, password);
    });
  }

  logIn = (username, password) => {
    const url = baseUrl + '/login';
    const auth = 'Basic ' + window.btoa(username + ':' + password);
    const options = {
      headers: {Authorization: auth}
    };
    this.httpClient.post(url, null, options).subscribe(() =>{
      console.log(username + ' logged in');
      this.globals.isLoggedIn = true;
      this.globals.addrecipe = false;
      this.globals.user = username;
      this.globals.pass = password;
      Cookie.set('username', username);
      Cookie.set('password', password);
    }, function () {
      alert('Sorry, wrong password. Try again');
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
    const url = baseUrl + '/recipe';
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
    const url = baseUrl + '/recipe/' + id;
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
