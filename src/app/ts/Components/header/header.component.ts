import {Component, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import {Router} from '@angular/router';
import {LoginService, UserService} from '../../Services';
import {FormGroup} from '@angular/forms';
import {profileForm} from '../../Models/profileForm';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {
  private Globals = Globals;
  private register = false;
  private usernameCheck: boolean ;
  private username: String;
  profileForm: FormGroup;
  get Name() {
    return this.profileForm.get('name');
  }
  get adress() {
    return this.profileForm.get('adress') as FormGroup;
  }

  ngOnInit() {
    this.profileForm = profileForm;
    this.usernameCheck = this.cookieService.check('username');
    if (this.usernameCheck) {
      this.username = this.cookieService.get('username');
    }

  }


  constructor(private userService: UserService, private loginService: LoginService, private router: Router,
              private cookieService: CookieService,
              private globals: Globals
  ) {}

  logout(): void {
    this.router.navigate(['']);
    this.usernameCheck = false;
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
    this.loginService.logIn(user).subscribe((res) => {
      this.usernameCheck = true;
      this.username = this.cookieService.get('username');
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
