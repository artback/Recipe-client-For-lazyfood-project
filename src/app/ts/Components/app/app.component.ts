import { Component } from '@angular/core';
import {LoginService, UserService} from '../../Services';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {profileForm} from '../../Models';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent  {
  title = 'lazy client';
  login = this.loginService;
  private register = false;
  profileForm: FormGroup;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {}
  get Name() {
    return this.profileForm.get('name');
  }

  ngOnInit() {
    this.profileForm = profileForm;

  }
  getYear(): number  {
    return moment().add(2, 'days').year();
  }
  getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }



  logout(): void {
    this.loginService.logout();
  }

  createAccount(modal): void {
    const user = this.profileForm.value;
    this.userService.createUser(user).subscribe(() => {
      this.logIn(modal);
    }, function () {
      alert('Sorry, Username already exist');
    });
  }

  logIn(modal): void {
    const user = this.profileForm.value;
    this.loginService.logIn(user).subscribe(() => {
      this.close(modal);
    }, (error) => {
      if (error.status === 403) {
        this.register = true;
      }  else if (error.status === 401) {
        alert('Sorry, Password invalid');
        this.profileForm.patchValue({'password': ''});
      } else {
        alert('Unknown error');
        console.log(error);
        this.close(modal);
      }
    });
  }
  private close(modal): void {
    this.profileForm.reset();
    this.register = false;
    modal.hide();
  }
}
