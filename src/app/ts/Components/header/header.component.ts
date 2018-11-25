import {Component, OnInit} from '@angular/core';
import {LoginService, UserService} from '../../Services';
import {FormGroup} from '@angular/forms';
import {profileForm} from '../../Models/profileForm';
import {Router} from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {
  private register = false;
  profileForm: FormGroup;
  login = this.loginService;
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


  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {}

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
