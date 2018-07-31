import {Component , OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {
  private register = false;
  profileForm: FormGroup;
  get Name() {
    return this.profileForm.get('name');
  }
  get adress() {
    return this.profileForm.get('adress') as FormGroup;
  }
  ngOnInit() {
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
  constructor(private userService: UserService, public globals: Globals, private router: Router, private fb: FormBuilder) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
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
      this.profileForm.patchValue({password: ''});
    }, (error) => {
      if (error === 'User don\'t exist') {
       this.register = true;
      } else {
        alert(error);
      }
    });
  }
  private close(modal): void {
   this.profileForm.patchValue({password: ''});
   this.register = false;
   modal.hide();
  }
}
