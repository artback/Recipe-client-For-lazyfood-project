import {Component} from '@angular/core';
import {Globals} from '../Injectable/globals';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: '../../template/header.html',
  styleUrls: ['../../css/header.css']
})

export class HeaderComponent {
  private name: String;
  private password: String;
  constructor(public userService: UserService, public globals: Globals, public router: Router) {

  }
  logout(): void {
    this.globals.isLoggedIn = false;
    this.globals.user = '';
    this.globals.pass = '';
    Cookie.set('username', '');
    Cookie.set('password', '');
    this.router.navigate(['']);
  }
  submit(modal): void {
   modal.hide();
   this.createUser();
  }
  createUser(): void {
    this.userService.createUser(this.name, this.password);
  }


}
