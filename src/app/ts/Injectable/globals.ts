import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  readonly SERVERURL = 'http://localhost:8080';
  readonly NAMELENGTH = 4;
  user: String;
  pass: String;
  isLoggedIn = false;
}
