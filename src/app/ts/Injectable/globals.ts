import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  baseUrl: 'http://localhost:8080';
  user;
  pass: String;
  isLoggedIn = false;
  isHome = true;
  addrecipe = false;
}
