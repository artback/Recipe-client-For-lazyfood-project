import {Component, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {
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
    this.usernameCheck =  this.cookieService.check('username');
    if (this.usernameCheck) {
     this.username = this.cookieService.get('username');
    }
    this.createForm();
  }

  createForm(): void {
    const adress = this.fb.group({
      address: '',
      co: '',
      state: '',
      city: '',
      postalcode: '',
    });
    this.profileForm = this.fb.group({
      username: [''],
      password: [''],
      surname: ['', [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      forename: ['', [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      adress: adress
    });
  }

  constructor(private userService: UserService, public globals: Globals,
              private router: Router, private fb: FormBuilder, private cookieService: CookieService) {}

  logout(): void {
    this.router.navigate(['']);
    this.usernameCheck = false;
    this.cookieService.delete('username');
    this.cookieService.delete('access_token');
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
    this.userService.logIn(user).subscribe((res) => {
      this.usernameCheck = true;
      this.cookieService.set('access_token', res.access_token);
      this.cookieService.set('username', user.username );
      modal.hide();
      this.profileForm.reset();
    }, (error) => {
      if (error.status === 403) {
        this.register = true;
      }  else if (error.status === 401) {
        alert('Sorry, Password invalid');
        this.profileForm.patchValue({'password': ''});
      } else {
        console.log(error);
      }
    });
  }

  private close(modal): void {
    this.profileForm.reset();
    this.register = false;
    modal.hide();
  }
}
