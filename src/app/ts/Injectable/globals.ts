import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  readonly SERVERURL = 'http://localhost:8080';
  user: String;
  isLoggedIn = false;
}
