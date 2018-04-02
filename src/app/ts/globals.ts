import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  user: String;
  pass: String;
  isLoggedIn = false;
  isHome = true;
}
