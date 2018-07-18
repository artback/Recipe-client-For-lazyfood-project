import {Component, Input, OnInit} from '@angular/core';
import {Globals} from '../Injectable/globals';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';
import {NumberValidator} from '../Injectable/NumberValidator';
@Component({
  selector: 'app-profile',
  templateUrl: '../../template/profile.html',
  styleUrls: ['../../css/profile.css'],
})
export class EditProfileComponent implements OnInit {
  private user;
  private img;
  profileForm: FormGroup;
  get Name() {
    return this.profileForm.get('name');
  }
  get adress() {
    return this.profileForm.get('adress') as FormGroup;
  }
  onFileSelected(files) {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          this.img = e.target.result;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
    }
  }
  ngOnInit() {
    if (!this.globals.isLoggedIn) {
      console.log('not logged in');
      this.router.navigate(['']);
    }
    this.userService.getUserData(this.globals.user).subscribe((user) =>{
      console.log(user);
      this.user = user;
      this.img = user.img;
      delete user.img;
      this.createForm();
    });
  }
  constructor(public userService: UserService,
              public globals: Globals,
              public router: Router, private fb: FormBuilder) {}
  editProfile() {
    let user = this.profileForm.value;
    user.username = this.globals.user;
    user.img = this.img;
    this.userService.editUser(user);
  }
  createForm() {
    const aDress = this.user.adress;
    const adress = this.fb.group({
      address: aDress.address,
      co: aDress.co,
      state: aDress.state,
      city: aDress.city,
      postalcode: [aDress.postalcode, [NumberValidator.numeric]]
    });
    this.profileForm = this.fb.group({
      surname: [this.user.surname, [
        Validators.required,
        Validators.minLength(this.NAMELENGTH)
      ]],
      forename: [this.user.forename, [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      adress: adress
    });
  }
}
