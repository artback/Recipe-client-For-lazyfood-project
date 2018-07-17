import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Globals} from '../Injectable/globals';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../Services/user.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: '../../template/header.html',
  styleUrls: ['../../css/header.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private register = false;
  profileForm: FormGroup;
  get Name() {
    return this.profileForm.get('name');
  }
  get adress() {
    return this.profileForm.get('adress') as FormGroup;
  }
  ngOnInit() {
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
        Validators.minLength(this.NAMELENGTH)
      ]],
      forename: ['', [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      adress: adress
    });
  }
  constructor(private userService: UserService, public globals: Globals, private router: Router, private fb: FormBuilder) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
  regAct(): void {
   this.register = true;
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
   this.userService.logIn(user.username, user.password).subscribe(() => {
      this.globals.isLoggedIn = true;
      this.globals.user = user.username;
      Cookie.set('username', user.username);
      modal.hide();
    }, function (error) {
      alert(error);
    });
  }
  close(modal): void {
   this.register = false;
   modal.hide();
  }
}
